// Directorio.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Directorio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Directorio de la UDG</Text>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: 'https://www.cucei.udg.mx/es/directorio' }}
          style={styles.webview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA', 
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#031674', 
    marginBottom: 20,
  },
  webviewContainer: {
    width: '96%',  
    height: '90%', 
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#031674', 
    backgroundColor: '#FFFFFF',
  },
  webview: {
    flex: 1,
  },
});
