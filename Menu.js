import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from "./Inicio";
import Login from "./Login";
import Directorio from "./Directorio";
import HomePostLogin from "./HomePostLogin";
import Kardex from "./Kardex";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
    };
  }


  componentWillUnmount() {
    if (this.authSubscription && typeof this.authSubscription.unsubscribe === 'function') {
      this.authSubscription.unsubscribe();
    }
  }

  render() {
    const Stack = createNativeStackNavigator();
    const { session } = this.state;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={session ? "HomePostLogin" : "Inicio"}>
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="HomePostLogin" component={HomePostLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="Directorio" component={Directorio} options={{ headerShown: false }}/> 
          <Stack.Screen name="Kardex" component={Kardex} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
