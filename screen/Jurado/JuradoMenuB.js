import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons,FontAwesome5 } from '@expo/vector-icons'

import Header from '../../ui/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import env from '../../global'
const Separator = () => (
  <View style={styles.separator} />
);






export default function JuradoMenuB(props) {
 

          const [categoria, setcategoria] = useState([])
          const [categoriaB, setcategoriaB] = useState([])
          const IsMounted = useRef(false)

          const [disabled,setDisabled]=useState(false)

        
         
              

      const onSubmit = (nombrePr, id) => {

        Axios.get(`http://${env.ip}:${env.port}/votacion/${props.route.params.idjurado}`).then(response => {
        

          const result = response.data.filter(e => e.idProyecto == id);
      
          
          if(result.length == 1){
            console.log(result);
            Alert.alert(
              "ADVERTENCIA",
              "No puede volver a evaluar un proyecto que ya registro su evaluacion previamente",
              [
                {
                  text: "Aceptar",
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          }
          
          else if(result.length == 0){
            
            props.navigation.navigate('JuradoVotacion', { idProyecto: id, nombreProyecto: nombrePr, idJurado: props.route.params.idjurado, categoria:props.route.params.categoria  })
          }

        })
      

        

      }

         useEffect(() => {
          if(IsMounted.current==false){
            Axios.get(`http://${env.ip}:${env.port}/orden/${props.route.params.id}`).then(response=>{
            
    
              const result = response.data.filter(e=>e.categoria == "Categoria B");
              setcategoria(result)

              
           //console.log(categoria[0].ordenProyectos[0].catA)
            setcategoriaB(result[0].ordenProyectos[0].catB)
      
          })
          IsMounted.current==true 
          }                 
        }, [])
        
    
        
  const Card = ({nombrePr, id ,estudiantes, curso }) => {
    return (


      <TouchableOpacity disabled= {categoria[0].estado == "I" ? true :false } onPress={()=> onSubmit(nombrePr,id)}>


      <View style={{
  
        flexDirection:"row",
        marginHorizontal:10,
        marginVertical:6,
        marginTop:15,
        borderRadius:20,
        backgroundColor:"#F2BB09",
        paddingVertical:20,
        paddingHorizontal:24,
        alignItems:"center",
        justifyContent:"space-between",
        borderColor:"#0A245F"
      }}>
        
        <View>
        <Text style={{fontSize:16,  color: 'rgba(255, 255, 255, 0.7)'}}>Proyecto:</Text>
    <Text style={{fontSize:16, marginBottom:10}}>{nombrePr}</Text>
    <Text style={{fontSize:16,  color: 'rgba(255, 255, 255, 0.7)'}}>Curso:</Text>
    <Text style={{fontSize:16}}>{curso}</Text>

    <View style={{flexDirection:"row" , marginTop:20}} >
           <FontAwesome5 name="vote-yea" size={24} color="black"   />
           </View> 
 
        </View>
       
      </View>


      </TouchableOpacity>
    )
  }    
  
 
 
  const colors = {
    themeColor: '#0A245F',
    white: '#fff',
    background: '#f4f6fc',
    greyish: '#a4a4a4',
    tint: '2b49c3'
  }
 

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
            <Text style={{ color: colors.white, fontSize: 40, textAlign:'center' }}>{"Proyectos\n Categoria B"}</Text>
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

     <Text style={{ color: colors.black, fontSize: 20,  textAlign:'center', marginTop:20  }}>{"Haga click sobre el proyecto para puntuarlo"}</Text>

     {categoriaB.map(card => <Card nombrePr={card.nombreProyecto}  curso={card.curso}  id={card._id}/>)}
     




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

