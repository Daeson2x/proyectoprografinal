import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: "",
      imagenTemp: "",
      ciudad: "Guadalajara",
      humedad: "",
      viento: "",
    };
  }

  componentDidMount() {
    this.buscarClima();
    this.intervalId = setInterval(this.buscarClima, 240000); 
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  buscarClima = async () => {
    const lat = 20.6597; 
    const lon = -103.3496; 

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=19bd867e8eba4ac7afa192017240309&q=${lat},${lon}&aqi=no`
      );
      const datos = await response.json();
      this.setState({
        temperatura: datos.current.temp_c,
        imagenTemp: `https:${datos.current.condition.icon}`,
        ciudad: datos.location.name,
        humedad: datos.current.humidity,
        viento: datos.current.wind_kph,
      });
    } catch (error) {
      console.error("Error al buscar los datos del clima:", error);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.topContainer}>
          <View style={styles.weatherInfo}>
            <Image
              source={{ uri: this.state.imagenTemp }}
              style={styles.weatherIcon}
            />
            <Text style={styles.cityText}>{this.state.ciudad}</Text>
            <Text style={styles.weatherText}>
              {this.state.temperatura ? `${this.state.temperatura}°C` : "Cargando clima..."}
            </Text>
          </View>

          <Image
            source={require('./images/cucei-logo.png')}
            style={styles.logo}
          />

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Image
              source={require('./images/account-icon.png')}
              style={styles.loginImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
  <TouchableOpacity
          style={styles.gridItem3}
          onPress={() => this.props.navigation.navigate('Directorio')}
        >
          <Text style={styles.gridText}>Directorio</Text>
        </TouchableOpacity>
  <View style={styles.buttonLayer}>
    <TouchableOpacity style={styles.gridItem}>
      <Text style={styles.gridText}>RA</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.gridItem2}>
      <Text style={styles.gridText}>Módulos</Text>
    </TouchableOpacity>
  </View>

        {/* Mapa con marcador en CUCEI */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 20.656997176047962,
              longitude: -103.32521841668813,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
          </MapView>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginLeft: 10,
  },
  weatherInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: -10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 14,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginRight: 30,
  },
  loginImage: {
    width: 48,
    height: 48,
    borderRadius: 1,
    marginRight: 20,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridItem3: {
    width: '60%',
    height: 90,
    marginBottom: 20,
    backgroundColor: '#031674',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: -100
  },
  buttonLayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  gridItem: {
    width: '40%',
    height: 90,
    margin: 8,
    backgroundColor: '#031674',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gridItem2: {
    width: '40%',
    height: 90,
    margin: 8,
    backgroundColor: '#031674',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  mapContainer: {
    borderColor: '#031674',
    borderWidth: 3,
    borderRadius: 10,
    width: '90%', 
    height: '40%', 
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  gridText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



