import React from 'react'
import {} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AdminReporte from './Admin/AdminReporte';
import AdminVotacion from './Admin/AdminVotacion';
export default function MenuAdmin(navigate) {
    console.log(navigate)
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                switch(route.name){
                    case 'Resultados':
                        return (
                            <AntDesign name="barschart" size={30} color="black" />
                        );
                    case 'Votacion':
                        return (
                            <MaterialIcons name="how-to-vote" size={30} color="black" />
                        );
                }

            },  
          })}
          tabBarOptions={{
            activeTintColor: '#0A245F',
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Resultados" component={AdminReporte}/>
            <Tab.Screen name="Votacion" component={AdminVotacion}/>
        </Tab.Navigator>
    )
}