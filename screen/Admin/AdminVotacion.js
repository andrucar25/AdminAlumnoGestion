import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView,ScrollView, Text, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import {MaterialCommunityIcons,AntDesign,MaterialIcons, FontAwesome5,Octicons } from '@expo/vector-icons'
import env from '../../global'

import { TouchableOpacity } from 'react-native-gesture-handler';

const Separator = () => (
    <View style={styles.separator} />
  );

export default function AdminVotacion({navigation}) {
  const [ordenProyectos, setOrdenProyectos] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [proyectosA, setProyectosA] = useState([])
  const [proyectosB, setProyectosB] = useState([])
  const [proyectosC, setProyectosC] = useState([])
  const [idConcursoActual, setidConcursoActual] = useState('')
  const IsMounted = useRef(false)

  const DestroyModal = () =>
    Alert.alert(
      "Terminar el Concurso de proyectos",
      "El resultado de esta funcion es irreversible",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Terminar", onPress:DestroyConcurso }
      ],
      { cancelable: false }
    );
  const DestroyConcurso = () => {
    console.log("Destruido")
    console.log(idConcursoActual)
    Axios.put(`http://${env.ip}:${env.port}/concurso/${idConcursoActual}/desactivar`).then(res=>{ 

      Axios.get(`http://${env.ip}:${env.port}/projectos/projectos/aprobados`).then(ress=>{ 
            
      for(const pro of ress.data){
        console.log(pro._id)
        Axios.put(`http://${env.ip}:${env.port}/projectos/${pro._id}/desactivar`)
      }
      Alert.alert('El concurso fue eliminado, Nos autodestruiremos') 
      })
      
        })
  }
    const listOrden = () =>{
      //setOrdenProyectos([])
      Axios.get(`http://${env.ip}:${env.port}/concurso/active`).then(response=>{
        setidConcursoActual(response.data._id)
        Axios.get(`http://${env.ip}:${env.port}/orden/${response.data._id}`).then(res=>{ 
            
            setProyectosA([])
            setProyectosB([])
            setProyectosC([])
            for(let pro of res.data[0].ordenProyectos[0].catA){
              setProyectosA(c=>[...c,pro])
            }
            for(let pro of res.data[1].ordenProyectos[0].catB){
              setProyectosB(c=>[...c,pro])
            }
            for(let pro of res.data[2].ordenProyectos[0].catC){
              setProyectosC(c=>[...c,pro])
            }
            // for(const orden of res.data){
            //   setOrdenProyectos(o=>[...o,orden.ordenProyectos[0]])
            // }
            setOrdenProyectos(res.data)
        })
    })
    }
   
    const changeState = (id,estado) => {
      Axios.put(`http://${env.ip}:${env.port}/orden/estado/${id}/${estado}`).then(async (response)=>{
        console.log(response.data)
        await listOrden()
      })
    }
    const cerrarVotacion = (id,name) => {
      Alert.alert(
        `Esta seguro de Cerrar las votaciones para la ${name}`,
        `${id}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Desactivar", onPress: () => changeState(id,"I")}
        ],
        { cancelable: false }
      );
    }
    const updateEstado = (id,name)=> {
      console.log("UpdateEstado")
      Alert.alert(
        `Esta seguro de Activar las votaciones para la ${name}`,
        `${id}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Activar", onPress: () => changeState(id,"V")}
        ],
        { cancelable: false }
      );

    }
    const result=[{
      nombre:'Proyecto Gestion de tiendas',
      categoria:'Categoria C',
      votos:{
        cat1:1,
        cat2:1,
        cat3:3,
        cat4:1,
        cat5:4,
        cat6:3,
      },
      resultado:13
    }]
    const colors ={
      themeColor:'#0A245F',
      white:'#fff',
      background:'#f4f6fc',
      greyish:'#a4a4a4',
      tint:'2b49c3'
    }
    const Resultados=({nombre,categoria,id})=>{
      return (
        <TouchableOpacity onPress={()=>navigation.navigate('AdminResultados',{id:id,nombre:nombre})}>
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
      <Text style={{fontSize:16}}>{nombre}</Text>
            <Text style={{color:colors.greyish}}>{categoria}</Text>      
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
        </View>
        <Separator/>      
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
    const Orden = ({name,id,stamp,estado}) => {
      return (
        <View style={{
          backgroundColor:estado == "I" ? "#fff" : "#F2BB09",
          flexDirection:"row",
          marginHorizontal:16,
          marginVertical:4,
          borderRadius:20,
          paddingVertical:20,
          paddingHorizontal:24,
          alignItems:"center",
          justifyContent:"space-between"
        }}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            
            <MaterialIcons 
            name="category"
            size={30}
            style={{
             color:estado == "I" ?"#0A245F":"#000000"
            ,marginRight:5}}/>
          </View>
          <View>
      <Text style={{fontSize:16}}>{name}</Text>
      <Text style={{color:estado == "I" ? colors.greyish : "black"}}>{stamp}</Text>
          </View>
          <View>
            {
              estado == 'I' &&
              <TouchableOpacity onPress={()=>updateEstado(id,name)}>
              <MaterialCommunityIcons
              name="vote"
              size={30}
              style={{color:"#0A245F",marginLeft:5}}              
               />
            </TouchableOpacity>  

            }
            {
              estado == "V" &&
              <TouchableOpacity onPress={()=>cerrarVotacion(id,name)}>
                <MaterialCommunityIcons 
                name="stop-circle" 
                size={30} 
                style={{color:"black",marginLeft:5}}               />
            </TouchableOpacity>
            }
            
          </View>
        </View>
      )
    }    
    
    useEffect(() => {
      if(IsMounted.current==false){
       listOrden()
      IsMounted.current==true 
      }                 
    }, [])
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

              <MaterialCommunityIcons
                name="text"
                size={30}
                style={{color:colors.white}}
               />
               <View style={{flexDirection:"row",marginTop:20}}>
                 {
                   showResults==false &&
                   <TouchableOpacity onPress={async()=>{
                     
                     setShowResults(true)
                     }}>
                  <MaterialCommunityIcons 
                    name="eye-circle-outline"
                    size={30}
                    style={{color:colors.white}}
                  />
                  </TouchableOpacity>
                 }
                  {
                    showResults&&
                    <TouchableOpacity onPress={()=>setShowResults(false)}>
                  <MaterialCommunityIcons 
                    name="eye-circle-outline"
                    size={30}
                    style={{color:colors.white}}
                  />
                  </TouchableOpacity>
                  }
               </View>  
              </View>
              <View style={{padding:16}}>
                <Text style={{color:colors.white,fontSize:40,marginBottom:20}}>{showResults ?"Resultados Por Proyectos":"Activar \nVotacion Por Categorias"}</Text>

                
                <Button
        title="Terminar Concurso de Proyecto"
        color="#ff0000"
        onPress={DestroyModal}
      />
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
              {/* const result=[{
      nombre:'Proyecto Gestion de tiendas',
      categoria:'Categoria C',
      votos:{
        cat1:1,
        cat2:1,
        cat3:3,
        cat4:1,
        cat5:4,
        cat6:3,
      },
      resu */}
            {
              showResults&&
                proyectosA.map(re=><Resultados nombre={re.nombreProyecto} categoria={re.categoria} id={re._id} />)
              
            }
            {
              showResults&&
                proyectosB.map(re=><Resultados nombre={re.nombreProyecto} categoria={re.categoria} id={re._id}/>)
              
            }
            {
              showResults&&
                proyectosC.map(re=><Resultados nombre={re.nombreProyecto} categoria={re.categoria} id={re._id}/>)
              
            }
            {
              showResults == false &&
              ordenProyectos.map(orden => <Orden name={orden.categoria} id={orden._id} stamp={orden.tituloConcurso} estado={orden.estado}/>)
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