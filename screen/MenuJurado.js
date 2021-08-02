import React from 'react'
import {} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JuradoMenuA from './Jurado/JuradoMenuA';
import JuradoMenuB from './Jurado/JuradoMenuB';
import JuradoMenuC from './Jurado/JuradoMenuC';
import AdminReporte from './Admin/AdminReporte';

const Tab = createBottomTabNavigator();
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export default function MenuJurado(props) {
    const idjurado = props.route.params.idjurado
    const categoria = props.route.params.categoria
    const  id = props.route.params.id
    

   

   

    console.log(categoria)
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                switch(route.name){
                    case 'Home':
                        return (
                            <Feather name="home" size={30} color="black" />
                        );
                    case 'Resultado':
                        return (
                            <AntDesign name="linechart" size={30} color="black" />
                        );
                }

            },  
          })}
          tabBarOptions={{
            activeTintColor: '#0A245F',
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Home" component={categoria == "Categoria A" ? JuradoMenuA : categoria == "Categoria B" ? JuradoMenuB : JuradoMenuC} initialParams={{id:id, idjurado:idjurado, categoria:categoria}}/>
            <Tab.Screen name="Resultado" component={AdminReporte}/>
        </Tab.Navigator>
    )
}
