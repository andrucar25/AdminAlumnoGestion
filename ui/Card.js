import React from 'react'
import {StyleSheet,Text,View,Image,Dimensions,TouchableHighlight,Alert} from 'react-native';
import votoImagen from '../assets/voto-positivo.png'
const win = Dimensions.get('window');
const ratio = win.width/1000;
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../global'
export default function Card({idProyecto,nombreProyecto,estudiantes,curso,navegacion}) {
    const onPressIngresar = (id) => {
        console.log(id)
        return (
        Alert.alert(
            `Votacion`,
            `¿Esta seguro que quiere votar por ${nombreProyecto}?`,
            [
              {
                text: "Cancelar",
                onPress: () => {
                },
                style: "cancel"
              },
              { text: "Aceptar", onPress: () => {    
                    const data = {
                        idProyecto:idProyecto,
                        nombreProyecto:nombreProyecto,
                        IdVotante:navegacion.route.params.id,
                        tipo:'Estudiante',
                        categoria:navegacion.route.params.categoria,
                        votos:{},
                        resultado:1,
                    }
                    Axios.post(`http://${env.ip}:${env.port}/votacion/`, data).then (res => {
                        console.log('Correctamente creado')
                        console.log(navegacion)
                        navegacion.navigation.navigate('MenuDelEstudiante'),{id:navegacion.route.params.id}
                    })
                } }
            ],
            { cancelable: false }
          )
        )
        
    }

    const onPressAceptar = () => {
        console.log('Aceptar')
    }
    const onPressCancelar = () => {
        console.log('Cancelar')
    }
    return (
        <View>
            <TouchableHighlight underlayColor="white" onPress={() => onPressIngresar(idProyecto)} key={idProyecto}>
                <View style={styles.card}>
                    <View style={styles.contenido}>
                        <View style={styles.izquierda}>
                            <Image style={styles.imagen} source={votoImagen}/> 
                        </View>
                        <View style={styles.derecha}>
                            <View style={styles.derecha_principal}>
                                <Text style={{fontWeight: 'bold'}}>{nombreProyecto}</Text>
                                <Text>{estudiantes}</Text>
                                <Text>{curso}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.linea}></View>
                </View>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:10,
        display:'flex',
        flexDirection:'column'
    },
    contenido:{
        flex:1,
        flexDirection:'row',
    },
    izquierda:{
        alignItems:'center',
        flex:1,
    },
    imagen:{
        resizeMode:'contain',
        width: win.width/4,
        height: 362 * ratio,
    },
    derecha:{
        flex:2
    },
    derecha_principal:{
        padding:15
    },
    linea:{
        width:'100%',
        height:10,
        backgroundColor:'#154360'
    }
})

