import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//SCREEN
import Home from './screen/Home'
import Login from './screen/Login'
import Concurso from './screen/Concurso'
import AdminVotacion from './screen/Admin/AdminVotacion';
import AdminResultados from './screen/Admin/AdminResultados';
import MenuAdmin from './screen/MenuAdmin';
import EstudMenu from './screen/Estudiante/EstudMenu';
import EstudVotacion from './screen/Estudiante/EstudVotacion';
import JuradoMenuA from './screen/Jurado/JuradoMenuA';
import JuradoMenuB from './screen/Jurado/JuradoMenuB';
import JuradoMenuC from './screen/Jurado/JuradoMenuC';
import EstudResultado from './screen/Estudiante/EstudResultado'
import JuradoVotacion from './screen/Jurado/JuradoVotacion';
import MenuDelEstudiante from './screen/MenuDelEstudiante';
import MenuJurado from './screen/MenuJurado';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Concurso" component={Concurso} />
        <Stack.Screen name="AdminVotacion" component={AdminVotacion} />
        <Stack.Screen name="AdminResultados" component={AdminResultados} />
        <Stack.Screen name="MenuAdmin" component={MenuAdmin} />
        <Stack.Screen name="EstudMenu" component={EstudMenu} />
        <Stack.Screen name="EstudVotacion" component={EstudVotacion} />
        <Stack.Screen name="JuradoMenuA" component={JuradoMenuA} />
        <Stack.Screen name="JuradoMenuB" component={JuradoMenuB} />
        <Stack.Screen name="JuradoMenuC" component={JuradoMenuC} />
        <Stack.Screen name="JuradoVotacion" component={JuradoVotacion} />
        <Stack.Screen name="Resultado" component={EstudResultado} />
        <Stack.Screen name="MenuDelEstudiante" component={MenuDelEstudiante} />
        <Stack.Screen name="MenuJurado" component={MenuJurado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

