import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView,ScrollView, Text, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import {MaterialCommunityIcons,AntDesign,Octicons,MaterialIcons} from '@expo/vector-icons'

import { TouchableOpacity } from 'react-native-gesture-handler';
import env from '../../global'
const Separator = () => (
    <View style={styles.separator} />
  );

export default function AdminResultados(props) {    
    const [jurado, setJurado] = useState({})
    const [estudiante, setEstudiante] = useState({})
    useEffect(() => {
        Axios.get(`http://${env.ip}:${env.port}/votacion/proyecto/${props.route.params.id}`).then(response=>{
                              
        let result = 0
        let resultdos= 0
        const datosJurados = {}
        const datosEstudiantes= {}
        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].tipo == "Jurado"){                       
            result = result+parseInt(response.data[i].resultado)
            datosJurados[response.data[i].tipo]={
              categoria:response.data[i].categoria,
              nombreProyecto:response.data[i].nombreProyecto,
              tipo:response.data[i].tipo,
              resultado:result
            }
          }else{
            resultdos = resultdos+parseInt(response.data[i].resultado)
            datosEstudiantes[response.data[i].tipo]={
              categoria:response.data[i].categoria,
              nombreProyecto:response.data[i].nombreProyecto,
              tipo:response.data[i].tipo,
              resultado:resultdos
            }
          }
        }
        
        setJurado(datosJurados.Jurado)
        
        setEstudiante(datosEstudiantes.Estudiante)
        
        console.log(typeof(datosJurados.Jurado.resultado))
        console.log(datosJurados.Jurado.resultado)
        })
        //console.log(props.route.params.id)
        //console.log("useEffect") 
        return () => {
          setJurado({})
          setEstudiante({})
        }

    }, [])    
    const colors ={
        themeColor:'#0A245F',
        white:'#fff',
        background:'#f4f6fc',
        greyish:'#a4a4a4',
        tint:'2b49c3'
      }

      const Resultados=({nombreProyecto,resultado,categoria,tipo})=>{
        return (
          <TouchableOpacity>
          <View style={{
            backgroundColor:"#fff",
            flexDirection:"row",
            marginHorizontal:16,
            marginVertical:4,
            borderRadius:20,
            paddingVertical:20,
            paddingHorizontal:24,
            alignItems:"flex-start",
            justifyContent:"space-between"
          }}>
            <View style={{flexDirection:"row",alignItems:"center",width:'20%'}}>
              
              <Octicons 
              name="project"
              size={30}
              style={{
               color:"#000000"
              ,marginRight:5}}/>
            </View>
            <View style={{width:'80%'}}>
        <Text style={{fontSize:16}}>{nombreProyecto}</Text>
              <Text style={{color:colors.greyish}}>{categoria}</Text>      
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
          </View>
          <Separator/>      
        </View>
        <View style={{flexDirection:'row'}}>
              <Text>{tipo} : </Text>
              <Text>{resultado}</Text>
        </View>
            </View>
            {/* <View>
            
                <TouchableOpacity onPress={()=>console.log("asd")}>
                <MaterialCommunityIcons
                name="vote"
                size={30}
                style={{color:"#0A245F",marginLeft:5}}              
                 />
              </TouchableOpacity>  
           
              
            </View> */}
          </View>
          </TouchableOpacity>
        )
      } 
  return (
        <> 
          <View 
          style={{flex:1,backgroundColor:colors.themeColor}}>

          <StatusBar barStyle="light-content" backgroundColor={colors.themeColor}/>
          <View style={{backgroundColor:colors.themeColor}}>
              <View 
                style={{
                  padding:16,
                  flexDirection:"row",
                  justifyContent:"space-between"}}>

            <TouchableOpacity onPress={()=>props.navigation.navigate("AdminVotacion")}>
              <MaterialCommunityIcons
                name="text"
                size={30}
                style={{color:colors.white}}
               />    
               </TouchableOpacity>          
              </View>
              
              <View style={{padding:16}}>
                <Text style={{color:colors.white,fontSize:40}}>{`${props.route.params.nombre}`}</Text>
                <View style={{
                  paddingHorizontal:16,
                  paddingVertical:6,
                  flexDirection:"row",
                  justifyContent:"space-between",
                  backgroundColor:colors.tint,
                  borderRadius:20,
                  marginVertical:20,
                  alignItems:"center"

                }}>      

                </View>
              </View>
          </View>     
          <ScrollView style={{
            backgroundColor:colors.background
          }}>
            {
              jurado != undefined &&
                <Resultados nombreProyecto={jurado.nombreProyecto} tipo={jurado.tipo} categoria={jurado.categoria} resultado={jurado.resultado}/>
            }            
            {
              estudiante != undefined &&
                <Resultados nombreProyecto={estudiante.nombreProyecto} tipo={estudiante.tipo} categoria={estudiante.categoria} resultado={estudiante.resultado}/>
            }            
            {
              jurado == undefined && estudiante == undefined &&
              <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:20}}>No hay votos para este proyecto</Text>
              </View>
            }
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
      fontSize:40
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
  });