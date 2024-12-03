import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FFE3D8',
  },
  weatherContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
    borderColor: '#29104A',
    borderWidth: 1,
  },
  weatherText: {
    fontSize: 16,
    color: '#29104A',
  },
  userIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  userIconImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Hacer la imagen redonda
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 160,
    justifyContent: 'center',
  },
  gridItem: {
    width: '40%',
    height: 70,
    margin: 8,
    backgroundColor: '#29104A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gridText: {
    color: '#FFE3D8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    paddingHorizontal: 10,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#522C5D',
  },
  // Estilos adicionales para Login.js
  inputContainer: {
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: '-10%',
  },
  input: {
    borderRadius: 50,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 3,
    width: '60%',
    padding:2,
  },
  inputText: {
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  button: {
    borderRadius: 9,
    overflow: 'hidden', // Asegúrate de que el borde redondeado se aplique correctamente
    width: '50%',
    marginTop: '10%',
  },
  googleButtonContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  googleButton: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 192,
    height: 48,
  },
    background: {
      flex: 1,
      resizeMode: 'cover', // Asegura que la imagen se ajuste correctamente
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      marginBottom: -50,
    },
    logo: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
    },
    inputContainer: {
      width: '60%',
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      paddingHorizontal: 5,
      backgroundColor: 'white',
    },
    inputText: {
      height: 40,
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      width: '80%',
    },

  
  
});

export default styles;