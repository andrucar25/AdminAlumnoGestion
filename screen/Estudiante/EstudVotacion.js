import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import Header from '../../ui/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import env from '../../global'
import Card from '../../ui/Card'

const Separator = () => (
  <View style={styles.separator} />
);

export default function EstudVotacion(navigation) {
  
  const [categoria,setCategoria] = useState(navigation.route.params.categoria)
  const [coleccion,setColeccion] = useState([])
  const [categoriaObjetivo,setcategoriaObjetivo] = useState([])
  const IsMounted = useRef(false)
  
  const colors = {
    themeColor: '#0A245F',
    white: '#fff',
    background: '#f4f6fc',
    greyish: '#a4a4a4',
    tint: '2b49c3'
  }
 

  useEffect(() => {
    Axios.get(`http://${env.ip}:${env.port}/orden/5fbafbdd38b7b54d24371b22`).then(response=>{
        const result = response.data.filter(e=>e.categoria == categoria);
        setColeccion(result)
        switch(categoria){
          case 'Categoria A':
            setcategoriaObjetivo(result[0].ordenProyectos[0].catA)
            break;
          case 'Categoria B':
            setcategoriaObjetivo(result[0].ordenProyectos[0].catB)
            break;
          case 'Categoria C':
            setcategoriaObjetivo(result[0].ordenProyectos[0].catC)
            break;
        }
    })  
  }, [])

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
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
            <Text style={{ color: colors.white, fontSize: 40, textAlign:'center' }}>{`${categoria}`}</Text>
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
        <ScrollView style={{backgroundColor: colors.background }}>
          <Text 
          style={{ color: colors.black, fontSize: 20,padding:5,  textAlign:'center', marginTop:20  }}>
            {"Selecciona 1 proyecto por el cual deseas votar en esta categoría"}
          </Text>
          {categoriaObjetivo.map(carta => 
          <Card
          key={carta._id}
          navegacion={navigation}
          idProyecto={carta._id} 
          nombreProyecto={carta.nombreProyecto}
          estudiantes={carta.curso}
          curso={carta.curso}/>)}
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
    marginTop:50,
    marginLeft:75
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center'
  },

});

