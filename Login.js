import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Alert, ImageBackground } from 'react-native';
import styles from './styles'; // Asegúrate de importar los estilos

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nip: '',
    };
  }

  login = () => {
    const { codigo, nip } = this.state;

    if (!codigo || !nip) {
      Alert.alert('Error', 'Es necesario especificar el código y NIP.');
      return;
    }

    console.log('Enviando solicitud de login...');
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log('Respuesta de la API:', xhttp.responseText);
          const response = JSON.parse(xhttp.responseText);
          if (response.nombre) {
            console.log('Credenciales correctas, navegando a HomePostLogin');
            _this.props.navigation.navigate('HomePostLogin', { codigo: _this.state.codigo, nip: _this.state.nip });
          } else {
            console.log('Credenciales incorrectas');
            Alert.alert('Error', 'Código o NIP incorrecto.');
          }
        } else {
          console.log('Error en la solicitud:', this.status);
          Alert.alert('Error', 'Error en la solicitud. Por favor, inténtalo de nuevo.');
        }
      }
    };
    xhttp.open(
      'GET', 'http://148.202.152.33/cucei/credenciales.php?codigo=' + codigo + '&nip=' + nip, true,
    );
    xhttp.send();
  };

  render() {
    return (
      <ImageBackground
        source={require('./images/background-login.jpg')} 
        style={styles.background} 
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('./images/cucei-login.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Ingresa Código"
                placeholderTextColor="black"
                onChangeText={codigo => this.setState({ codigo })}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Ingresa Nip"
                placeholderTextColor="black"
                onChangeText={nip => this.setState({ nip })}
                secureTextEntry={true}
                textContentType="password"
                autoCompleteType="password"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Iniciar Sesion" onPress={this.login} color="#0137B3" />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
