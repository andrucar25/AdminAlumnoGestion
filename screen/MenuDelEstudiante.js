import React from 'react'
import {} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EstudMenu from './Estudiante/EstudMenu'
import EstudResultado from './Estudiante/EstudResultado'

const Tab = createBottomTabNavigator();
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export default function MenuDelEstudiante(navigate) {
    const idEstudiante = navigate.route.params.id
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
            <Tab.Screen name="Home" component={EstudMenu} initialParams={{id:idEstudiante}}/>
            <Tab.Screen name="Resultado" component={EstudResultado} initialParams={{id:idEstudiante}}/>
        </Tab.Navigator>
    )
}
