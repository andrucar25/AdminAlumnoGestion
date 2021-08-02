import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import Header from '../../ui/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import env from '../../global'

export default function EstudMenu(props) {
  const[catA,setCatA] = useState(true)
  const[catB,setCatB] = useState(true)
  const[catC,setCatC] = useState(true)
  console.log(props)
  const SubmitCat = async (categoria) => {
    console.log(props)
    let objeto = props.route.params;
    objeto.categoria = categoria
    props.navigation.navigate('EstudVotacion', objeto) 
  }

  const colors = {
    themeColor: '#0A245F',
    white: '#fff',
    background: '#f4f6fc',  
    greyish: '#a4a4a4',
    tint: '2b49c3'
  }

  useEffect(() => {
    console.log('Renderizo')
    Axios.get(`http://${env.ip}:${env.port}/orden/5fbafbdd38b7b54d24371b22`).then(
      response => {
        console.log('Repito')
        const result = response.data.filter(e=>e.estado == 'V');
        switch(result[0].categoria){
          case 'Categoria A':
            setCatA(false);
            break;
          case 'Categoria B':
            setCatB(false);
            break;
          case 'Categoria C':
            setCatC(false);
            break;
        }
        Axios.get(`http://${env.ip}:${env.port}/votacion/${props.route.params.id}`).then(
          response => {
            if (response.data.lenght === 0){
              console.log('No se encontro nada, puede votar')
            }else{
              //console.log(response.data)
              const result = response.data.map(e=>{
                const mapCategoria = e.categoria
                switch(mapCategoria){
                  case 'Categoria A':
                    setCatA(true);
                    break;
                  case 'Categoria B':
                    setCatB(true);
                    break;
                  case 'Categoria C':
                    setCatC(true);
                    break;
                }
              });              
            }

          }
        )
      }
      )
  }, [props])
 
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
          <View style={{ padding: 16 }}>
            <Text style={{ color: colors.white, fontSize: 40, textAlign:'center' }}>{"Categorias de\nProyectos"}</Text>
            <View style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colors.tint,
              borderRadius: 20,
              marginVertical: 20,
              alignItems: "center"
            }}>
            </View>
          </View>
        </View>
        <ScrollView style={{
          backgroundColor: colors.background, 
        }}>
     <Text style={{ color: colors.black, padding:2, fontSize: 20,  textAlign:'center', marginTop:20  }}>{"Selecciona la categoría para visualizar los proyectos y votar"}</Text>
        <View style={styles.contenedor}>
          <TouchableOpacity activeOpacity={catA ? 0.001 : 1} style={styles.buttonCategory} disabled={catA} onPress={() => SubmitCat('Categoria A')} >
            <Text style={styles.text}>Categoría A</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={catB ? 0.001 : 1} style={styles.buttonCategory} disabled={catB} onPress={() => SubmitCat('Categoria B')}  >
            <Text style={styles.text}>Categoría B</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={catC ? 0.001 : 1} style={styles.buttonCategory} disabled={catC} onPress={() => SubmitCat('Categoria C')}  >
            <Text style={styles.text}>Categoría C</Text>
          </TouchableOpacity>

        </View>
          
        </ScrollView>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  contenedor:{
    flexDirection:'column',
    alignItems:'center',
    
  },
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
    width: 300,
    borderRadius: 24,
    backgroundColor: '#0A245F',
    marginTop:50
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },

});

