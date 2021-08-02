import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
    const logout = async() => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    const onSubmit = async() => {
        navigation.navigate('Concurso')
    }
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.todo}>
            <View style={styles.principal}>
                <Text style={styles.textH1}>Concurso de Proyectos - EPIS</Text>
                <Text style={styles.textH2}>Ingresa a una categoria para votar</Text>
            </View>
            <View style={styles.cuerpo}>
                <Button onPress={onSubmit} title="Categoria A"/>
                <Button title="Categoria B"/>
                <Button title="Categoria C"/>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <Button onPress={logout} title="Menu" />
                </View>
                <View style={styles.footer}>
                    <Button title="Resultados" />
                </View>
            </View>    
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textH1:{
    fontWeight:"bold",
    fontSize:2,
    marginBottom:"5%"
  },    
  todo:{
    justifyContent: 'space-between',
    height:"80%"
  },
  principal:{
    alignItems: 'center',
    flex:.5,
    justifyContent: 'center', 
  },
  cuerpo:{
    flex:1,    
    justifyContent: 'space-around',
  },
  footerContainer:{
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    //eight:"10%",
    flex:1,
    //justifyContent: 'space-between'
  }
});
