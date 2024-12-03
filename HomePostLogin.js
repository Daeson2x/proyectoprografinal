import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

export default function HomePost({ route, navigation }) {
    const { codigo, nip } = route.params; 
    const [clima, setClima] = useState(null);
    const [foto, setFoto] = useState(null); 
    const [creditos, setCreditos] = useState(null); 

    useEffect(() => {
        const fetchClima = () => {
          fetch('https://api.weatherapi.com/v1/current.json?key=163498ed25984d43ad6232014241811&q=Guadalajara')
            .then(response => response.json())
            .then(data => setClima(data.current))
            .catch(error => console.error("Error al obtener el clima:", error));
        };
    
        fetchClima(); 
        const intervalId = setInterval(fetchClima, 60000); 
    
        return () => clearInterval(intervalId); 
    }, []);

    useEffect(() => {
        obtenerFoto(codigo)
            .then(photoUrl => setFoto(photoUrl))
            .catch(error => console.error(error));

        fetch(`https://cuceimobile.space/Escuela/kardex.php?codigo=${codigo}&nip=${nip}`)
            .then(response => response.json())
            .then(data => setCreditos(data))
            .catch(error => console.error("Error al obtener los créditos:", error));
    }, [codigo, nip]);

    const obtenerFoto = (codigo) => {
        return new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(this.responseText);
                } else if (this.readyState === 4) {
                    reject("Error al obtener la foto");
                }
            };
            xhttp.open("GET", "http://148.202.152.33/cucei/fotoA.php?codigo=" + codigo, true);
            xhttp.send();
        });
    }

    const handleLogout = () => {
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que deseas salir?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Salir",
                    onPress: () => navigation.navigate('Inicio')
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.weatherInfo}>
                    {clima ? (
                    <>
                        <Image
                        source={{ uri: `https:${clima.condition.icon}` }}
                        style={styles.weatherIcon}
                        />
                        <Text style={styles.weatherText}>{clima.temp_c}°C</Text>
                    </>
                    ) : (
                    <Text style={styles.weatherText}>Cargando clima...</Text>
                    )}
                </View>

                <Image source={require('./images/cucei-logo.png')} style={styles.logo} />

                <View style={styles.userSection}>
                    <TouchableOpacity
                        style={styles.userIcon}
                        onPress={handleLogout}
                    >
                        {foto ? (
                            <Image
                                source={{ uri: foto }}
                                style={styles.userIconImage} 
                            />
                        ) : (
                            <Image
                                source={require('./images/account-icon.png')} 
                                style={styles.userIconImage} 
                            />
                        )}
                    </TouchableOpacity>
                    
                    {/* Imagen para finalizar sesión */}
                    <TouchableOpacity
                        style={styles.logoutIcon}
                        onPress={handleLogout}
                    >
                        <Image
                            source={require('./images/logout-icon.jpg')} // Ruta de la imagen
                            style={styles.logoutImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.gridContainer}>
                {/* Botones para navegar */}
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => navigation.navigate('Directorio', { codigo, nip })}
                >
                    <Text style={styles.gridText}>Directorio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => navigation.navigate('Kardex', { codigo, nip })}
                >
                    <Text style={styles.gridText}>Kardex</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.gridItem}
                >
                    <Text style={styles.gridText}>Módulos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.gridItem}
                >
                    <Text style={styles.gridText}>RA</Text>
                </TouchableOpacity>
            </View>

            {creditos && (
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>Avance escolar</Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={(creditos.creditosRequeridos ? (creditos.creditosArea.reduce((acc, area) => acc + area.creditosAdquiridos, 0) / creditos.creditosRequeridos) * 100 : 0)}
                        tintColor="#5C6BC0"
                        backgroundColor="#E3F2FD"
                        rotation={0}
                        lineCap="round"
                    >
                        {
                            (fill) => (
                                <Text style={styles.statsText}>
                                    {`${Math.round(fill)}%`}
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                    <Text style={styles.averageText}>Promedio: 9.5</Text>
                    {creditos.creditosArea.map((area, index) => (
                        <View key={index} style={styles.progressContainer}>
                            <Progress.Bar
                                progress={area.creditosRequeridos ? area.creditosAdquiridos / area.creditosRequeridos : 0}
                                width={200}
                                color="#5C6BC0"
                                style={styles.progressBar}
                            />
                            <Text style={styles.progressLabel}>{area.area}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#E8EAF6',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
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
    weatherText: {
        fontSize: 16,
        color: '#031674',
        marginLeft: 5,
    },
    weatherIcon: {
        width: 30,
        height: 30,
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        marginRight: 85,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIcon: {
        position: 'relative',
        marginRight: -10,
    },
    userIconImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: -10,
        marginLeft: -50
    },
    logoutIcon: {
        marginLeft: 6,
    },
    logoutImage: {
        width: 60,
        height: 60,
        borderRadius: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 0,
    },
    gridItem: {
        width: '40%',
        height: 90,
        margin: 10,
        backgroundColor: '#031674',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    gridText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    statsContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        borderColor: '#031674',
        borderWidth: 3,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#031674',
        marginBottom: 10,
    },
    statsText: {
        fontSize: 16,
        color: '#031674',
        marginTop: 10,
    },
    averageText: {
        fontSize: 16,
        color: '#031674',
        marginTop: 5,
    },
    progressContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        marginVertical: 10,
    },
    progressLabel: {
        marginTop: 5,
        color: '#031674',
        fontSize: 14,
    },
});
