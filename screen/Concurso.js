import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button,SafeAreaView,ScrollView} from 'react-native';
import NavBottom from '../ui/NavBottom';

export default function Concurso({navigation}) {
    const logout = () => {
        navigation.navigate('Home')
    }

  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.todo}>
            <View style={styles.principal}>
                <Text style={styles.textH1}>Concurso de Proyectos - EPIS</Text>
                <Text style={styles.textH2}>Vota por 1 solo proyecto en esta categoria</Text>
            </View>
            <SafeAreaView style={styles.cuerpo}>
                <ScrollView>
                <View style={styles.cuerpo}>
                <View style={styles.cuadro}>
                    <View style={styles.cuadroDetalle}>
                        <Text>Sistema de alertas</Text>
                    </View>
                    <Button title="Votar"/>
                </View>
                <View style={styles.cuadro}>
                    <View style={styles.cuadroDetalle}>
                        <Text tyle={styles.cuadroDetalle_nombre}>Sistema de alertas</Text>
                    </View>
                    <Button title="Votar"/>
                </View>
                <View style={styles.cuadro}>
                    <View style={styles.cuadroDetalle}>
                        <Text>Sistema de alertas</Text>
                    </View>
                    <Button title="Votar"/>
                </View>
                <View style={styles.cuadro}>
                    <View style={styles.cuadroDetalle}>
                        <Text>Sistema de alertas</Text>
                    </View>
                    <Button title="Votar"/>
                </View>
            </View>
                </ScrollView>
            </SafeAreaView>
            
        </View>        
    </View>
  );
}

const styles = StyleSheet.create({

    cuerpo:{
        flex:1,        
        flexWrap: 'wrap',
        
      },
    cuadro:{
        alignItems:"center",
        marginBottom: 15
    },
    cuadroDetalle:{
        paddingTop:10,
        //backgroundColor:"#02FE97",
        alignItems:"center",
        width:"90%",
        height:"4em"
    },
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
    height:"80%",
  },
  principal:{
    flex:0.2
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
