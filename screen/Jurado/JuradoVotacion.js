import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView, ScrollView, Text, Alert, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import Header from '../../ui/Header';
import env from '../../global'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';




const { width: WIDTH } = Dimensions.get('window');


const Separator = () => (
  <View style={styles.separator} />
);

export default function JuradoVotacion(props) {


  //Valores de los Picker
  const [creatividad, setCreatividad] = useState("")
  const [diseño, setDiseño] = useState("")
  const [aplicacion, setAplicacion] = useState("")
  const [complejidad, setComplejidad] = useState("")
  const [uso, setUso] = useState("")
  const [grado, setGrado] = useState("")



  //Funcion Registrar Voto
  const RegistrarVoto = () =>{
    Axios.post(`http://${env.ip}:${env.port}/votacion`,{

      idProyecto: props.route.params.idProyecto,
      nombreProyecto: props.route.params.nombreProyecto,
      IdVotante:props.route.params.idJurado,
      tipo:"Jurado",
      categoria:props.route.params.categoria,
      votos:{
        cat1:creatividad,
        cat2:diseño,
        cat3:aplicacion,
        cat4:complejidad,
        cat5:uso,
        cat6:grado,
      },
      resultado: parseInt(creatividad)+  parseInt(diseño) +  parseInt(aplicacion) +  parseInt(complejidad) +  parseInt(uso) + parseInt(grado),
    
          }).then( response => {

            if(props.route.params.categoria == "Categoria A"){
              props.navigation.navigate('MenuJurado')
            }

            if(props.route.params.categoria == "Categoria B"){
              props.navigation.navigate('MenuJurado')
            }

            if(props.route.params.categoria == "Categoria C"){
              props.navigation.navigate('MenuJurado')
            }

          })
          .catch( response => {
            console.log(error);
          });
  
       
      
  }

  

  //Boton Registrar Evaluacion

  const onSubmit = () => {


    if(creatividad == "" || diseño == "" || aplicacion == "" || complejidad == "" || uso == "" || grado == "" || creatividad == "Puntaje" || diseño == "Puntaje" || aplicacion == "Puntaje" || complejidad == "Puntaje" || uso == "Puntaje" || grado == "Puntaje"){

      Alert.alert(
        "ADVERTENCIA",
        "Debe seleccionar un numero como puntaje en todos los criterios para registrar su evaluacion",
        [
          {
            text: "Aceptar",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );

    }
    else{
      Alert.alert(
        "ADVERTENCIA",
        "¿Esta seguro de Registrar su voto? (No se puede modificar una vez registrado)",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Registrar", onPress: () => RegistrarVoto() }
        ],
        { cancelable: false }
      );
    }

   

  }

  const colors = {
    themeColor: '#0A245F',
    white: '#fff',
    background: '#f4f6fc',
    greyish: '#a4a4a4',
    tint: '2b49c3'
  }



console.log(creatividad)

  return (
    <>
      <View
        style={{ flex: 1, backgroundColor: colors.themeColor }}>

        <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
        <View style={{ backgroundColor: colors.themeColor }}>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between"
            }}>



          </View>
          <View style={{ padding:16}}>
            <Text style={{ color: colors.white, fontSize: 40, textAlign: 'center' }}>{"Evaluar Proyecto\n"}</Text>
            <View style={{borderBottomColor: 'white',  borderBottomWidth: 1,  width: WIDTH - 20,}}></View>

            <Text style={{ color: colors.white, fontSize: 22, textAlign: 'left' }}>{"Valorizacion de los criterios:\n"}</Text>
            <View style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
              <View>
                <Text style={{ color: colors.white, fontSize: 16, textAlign: 'left' }}>{"0: Nulo"}</Text>
                <Text style={{ color: colors.white, fontSize: 16, textAlign: 'left' }}>{"2: Bajo"}</Text>
              </View>
              <View>
                <Text style={{ color: colors.white, fontSize: 16, textAlign: 'left' }}>{"3: Medio"}</Text>
                <Text style={{ color: colors.white, fontSize: 16, textAlign: 'left' }}>{"4: Alto"}</Text>
              </View>
              <View>
                <Text style={{ color: colors.white, fontSize: 16, textAlign: 'left'   }}>{"5: Muy Alto"}</Text>
                <Text></Text>
              </View>
            </View>
          
          </View>


        </View>

        <ScrollView style={{
          backgroundColor: colors.background,          
        }}>



          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>Creatividad</Text>

            </View>

            <View style={{borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={creatividad} 
                onValueChange={(creatividad) =>
                  setCreatividad( creatividad )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>

          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>Diseño</Text>
            </View>

            <View style={{borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={diseño} 
                onValueChange={(diseño) =>
                  setDiseño( diseño )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>

          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>Aplicación práctica</Text>

            </View>

            
            <View style={{ borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={aplicacion} 
                onValueChange={(aplicacion) =>
                  setAplicacion( aplicacion )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>


          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>{"Complejidad\ntécnica"}</Text>

            </View>

            <View style={{ borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={complejidad} 
                onValueChange={(complejidad) =>
                  setComplejidad( complejidad )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>

          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>{"Uso de\nherramientas\ntecnológicas"}</Text>

            </View>

            <View style={{ borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={uso} 
                onValueChange={(uso) =>
                  setUso( uso )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>

          <View style={styles.card}>

            <View>
              <Text style={{ fontSize: 18 }}>{"Grado de \nexplicación\ndel participante"}</Text>

            </View>

            <View style={{ borderRadius: 5,  borderColor: "#0A245F",  borderWidth:2 }}>
                <Picker selectedValue={grado} 
                onValueChange={(grado) =>
                  setGrado( grado )
                }
                style={{height: 70, width: 120}}>
                  <Picker.Item label="Puntaje" value="Puntaje" ></Picker.Item>
                  <Picker.Item label="       0" value="0" ></Picker.Item>
                  <Picker.Item label="       2" value="2" ></Picker.Item>
                  <Picker.Item label="       3" value="3" ></Picker.Item>
                  <Picker.Item label="       4" value="4" ></Picker.Item>
                  <Picker.Item label="       5" value="5" ></Picker.Item>
                </Picker>
            </View>

          </View>


          <TouchableOpacity style={styles.btnLogin} onPress={onSubmit} >
                <Text style={styles.text}>Registrar Evaluacion</Text>
            </TouchableOpacity>




        </ScrollView>

      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 40
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonCategory: {
    padding: 16,
    width: 200,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#037ECA',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 75
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center'
  },
  btnLogin: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#037ECA',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft:50,
    marginBottom:20,
},
text: {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: 16,
  textAlign: 'center'
},
card:{
  flexDirection: "row",
  marginHorizontal: 10,
  marginVertical: 6,
  marginTop: 15,
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  alignItems: "center",
  justifyContent: "space-between",
  borderColor: "#F2BB09",
  borderWidth:2
},

});

