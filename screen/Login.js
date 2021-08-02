import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import bgImage from '../assets/backlogo.jpg'
import logo from '../assets/logoEPIS.png'
import Icon from 'react-native-vector-icons/Ionicons'
import env from '../global'

const { width: WIDTH } = Dimensions.get('window');


export default function Login({ navigation }) {

    const errorLogin = () =>
    Alert.alert(
      "El usuario o la contraseña es incorrecto",
      "Asegurese de colocar bien sus datos",
      [                
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    //Boton ocultar
    const [estado, setEstado] = useState({ showPass: true, press: false })

    const showPass = () => {
        if (estado.press == false) {
            setEstado({ showPass: false, press: true })
        } else {
            setEstado({ showPass: true, press: false })
        }
    }

    //Peticiones
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const onSubmit = async () => {
        console.log('Estoy enviando')
        const data = {
            codigo: username,
            contrasenia: password
        }
        Axios.post(`http://${env.ip}:${env.port}/auth/login`, data).then(response => {
            const config = {
                headers: { Authorization: "Bearer " + response.data.access_token }
            };
            const token = async() => {
                await AsyncStorage.setItem('token',response.data.access_token)
            }
            token() 
            Axios.get(`http://${env.ip}:${env.port}/auth/profile`, config).then(response => {
              
                if (response.data.rol == 'A') {
                   
                    navigation.navigate('MenuAdmin')                    
                }
                if (response.data.rol == 'E' ) {
                   
                    navigation.navigate('MenuDelEstudiante',{id:response.data.id})
                }
                if (response.data.rol == 'D') {
                
                    Axios.get(`http://${env.ip}:${env.port}/concurso/active`).then(res => {
                        //res.data.categorias
                        for(let i=0; i<res.data.categorias.length; i++){
                            let categorias = res.data.categorias[i].nombre
                            for(const jurado of res.data.categorias[i].jurados){                               
                                if(jurado.codigo == response.data.codigo){                                  
                                    if(categorias == "Categoria A"){                                       
                                        navigation.navigate('MenuJurado', {id:res.data._id, categoria:categorias, idjurado:jurado._id})                                       
                                    }
                                    if(categorias == "Categoria B"){                                       
                                        navigation.navigate('MenuJurado', {id:res.data._id, categoria:categorias, idjurado:jurado._id})                                       
                                    }
                                    if(categorias == "Categoria C"){                                       
                                        navigation.navigate('MenuJurado', {id:res.data._id, categoria:categorias, idjurado:jurado._id})                                       
                                    }
                                }
                            }

                        }
                    }
                    ).catch(e =>{
                        errorLogin()
                    })
                }
                
            })
        }).catch(e=>{
            errorLogin()
        })
        
    }

    // const tokenlogin = async() => {
    //     const value = await AsyncStorage.getItem('token')
    //     if(value != null){
    //         navigation.navigate('Home')
    //         console.log('Estas conectado')
    //     }else{
    //         console.log('Tienes que conectarte')
    //     }
    // }

    // tokenlogin()

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>

            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.logoText}>CONCURSO DE PROYECTOS  EPIS</Text>
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'}
                    style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={'Codigo'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    underlinColorAndroid='transparent'
                    onChangeText={(value) => setUsername(value)}
                />
            </View>


            <View style={styles.inputContainer}>
                <Icon name={'ios-lock-open'} size={28} color={'rgba(255, 255, 255, 0.7)'}
                    style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={'Contraseña'}
                    secureTextEntry={estado.showPass}
                    onChangeText={(value) => setPassword(value)}
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    underlinColorAndroid='transparent'

                />

                <TouchableOpacity style={styles.btnEye}

                    onPress={showPass}>
                    <Icon name={estado.press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={onSubmit} >
                <Text style={styles.text}>Ingresar</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 50

    },
    logoText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
        marginTop: 10,
        fontFamily: "sans-serif",
        textAlign: 'center',
        opacity: 0.9
    },
    inputContainer: {
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#037ECA',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },


});
