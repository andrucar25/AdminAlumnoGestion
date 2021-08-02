import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
// import all the components we are going to use
import { StyleSheet, Button, View, SafeAreaView,ScrollView, Text, Alert, Dimensions, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import env from '../../global'
import { VictoryPie } from 'victory-native';
import FetchResult from './FetchResult';
import { set } from 'react-native-reanimated';






const Item = ({ title,color,y }) => (
  <View style={{backgroundColor:color,flexDirection:"row",justifyContent:"space-between",flex:1,padding:16,borderRadius:50,height:"100%"}}>
      <View style={{width:"80%"}}>
        <Text >{title}</Text>
      </View>
      <Text style={{fontSize:20}}>{y}</Text>    
  </View>
);

export default function AdminReporte(props) {    
  
  const [refreshing, setRefreshing] = React.useState(false);




  const width = Dimensions.get('window').width
  const renderItem = ({ item }) => (
    <Item title={item.nombre} color={item.color} y={item.y}/>
  );


    const colors ={
        themeColor:'#0A245F',
        white:'#fff',
        background:'#f4f6fc',
        greyish:'#a4a4a4',
        tint:'2b49c3'
      }
      const [graphicData, setGraphicData] = useState([]); 
      const [graphicDataA, setGraphicDataA] = useState([])     
      const [graphicDataC, setGraphicDataC] = useState([])
      const [mayorCatA, setMayorCatA] = useState('')
      const [mayorCatB, setMayorCatB] = useState('')
      const [mayorCatC, setMayorCatC] = useState('')
      const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];
      const procesar =() => {
        const wantedGraphicData = [{ nombre: "Sistema de ventas upt", y: 13.2,color:"#388087" },
    { nombre: "Manejo de algoooooooooooooooooooo", y: 20,color:"#6fb3b8" },
    { nombre: "Los nose quien y no se cuantos", y: 30,color:"hsl(321.9060683699068,65.69978408955146%,85.34251746237673%)" }]; 
    Axios.get(`http://${env.ip}:${env.port}/votacion`).then(async response=>{
      const {catAResult,catBResult,catCResult,mayorCatA,mayorCatB,mayorCatC} = await FetchResult(response.data)
      setGraphicDataA(catAResult)
      setGraphicDataC(catCResult)
      setGraphicData(catBResult)
      setMayorCatA(mayorCatA)
      setMayorCatB(mayorCatB)
      setMayorCatC(mayorCatC)
      console.log(response.data)
      console.log(catBResult)
    })  
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        procesar()
        setRefreshing(false)
        
      }, []);
    
  useEffect(() => {
    procesar()
    // setGraphicData(wantedGraphicData); // Setting the data that we want to display    
  }, []);
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
       
              </View>
              
              <View style={{padding:8}}>
                <Text style={{color:colors.white,fontSize:40}}>{`Reporte General`}</Text>
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
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
            <View style={{marginBottom:20}}></View>
            {
  graphicDataA.length  != 0 &&
  <View style={{justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:20,fontWeight:"bold"}}>Categoria A</Text>
    

  <View style={styles.container}>
<VictoryPie
  cornerRadius={({ datum }) => datum.y * 5}        
  data={graphicDataA}
  width={250}
  height={250}
  colorScale={graphicDataA.map(({color}) => color)}      
  innerRadius={50}
/>

</View>
<SafeAreaView style={{
flex: 1,
justifyContent: 'center',
marginHorizontal: 16,      
}}>
<FlatList
  data={graphicDataA}
  renderItem={renderItem}
  keyExtractor={item => item.x}
/>
</SafeAreaView>
<View style={{marginTop:20,flexDirection:"column"}}>
  <Text style={{fontWeight:'bold'}}>El proyecto eligido por los estudiantes en la Categoria A : </Text>
<Text>{mayorCatA}</Text>
</View>
</View>
}

{
  graphicData.length  != 0 &&
  <View style={{justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:20,fontWeight:"bold"}}>Categoria B</Text>
    

  <View style={styles.container}>
<VictoryPie
  cornerRadius={({ datum }) => datum.y * 5}        
  data={graphicData}
  width={250}
  height={250}
  colorScale={graphicData.map(({color}) => color)}      
  innerRadius={50}
/>

</View>
<SafeAreaView style={{
flex: 1,
justifyContent: 'center',
marginHorizontal: 16,      
}}>
<FlatList
  data={graphicData}
  renderItem={renderItem}
  keyExtractor={item => item.x}
/>
</SafeAreaView>
<View style={{marginTop:20,flexDirection:"column"}}>
  <Text style={{fontWeight:'bold'}}>El proyecto eligido por los estudiantes en la Categoria B : </Text>
<Text>{mayorCatB}</Text>
</View>
</View>
}

{
  graphicDataC.length  != 0 &&
  <View style={{justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:20,fontWeight:"bold"}}>Categoria C</Text>
    

  <View style={styles.container}>
<VictoryPie
  cornerRadius={({ datum }) => datum.y * 5}        
  data={graphicDataC}
  width={250}
  height={250}
  colorScale={graphicDataC.map(({color}) => color)}      
  innerRadius={50}
/>

</View>
<SafeAreaView style={{
flex: 1,
justifyContent: 'center',
marginHorizontal: 16,      
}}>
<FlatList
  data={graphicDataC}
  renderItem={renderItem}
  keyExtractor={item => item.x}
/>
</SafeAreaView>
<View style={{marginTop:20,flexDirection:"column"}}>
  <Text style={{fontWeight:'bold'}}>El proyecto eligido por los estudiantes en la Categoria C : </Text>
<Text>{mayorCatC}</Text>
</View>
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