import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Kardex() {
    const [dataSource, setDataSource] = useState([]);
    const [nomalumno, setNomalumno] = useState("");

    useEffect(() => {
        // Fetch the credits data
        fetch('https://cuceimobile.space/Escuela/kardex.php')
            .then(response => response.json())
            .then(data => {
                console.log('Datos de créditos:', data); // Imprimir los datos de créditos en la consola
                setNomalumno(data.alumno);
                setDataSource(data.materias);
            })
            .catch(error => console.error("Error al obtener el kardex:", error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kardex</Text>
            <Text style={styles.subtitle}>Alumno: {nomalumno}</Text>

            <FlatList
                style={styles.list}
                data={dataSource}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.subject}>{item.descripcion}</Text>
                        <View style={styles.detailsRow}>
                            <Text style={styles.detail}>NRC: {item.nrc}</Text>
                            <Text style={styles.detail}>Clave: {item.clave}</Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.detail}>Créditos: {item.creditos}</Text>
                            <Text style={styles.detail}>Calificación: {item.calificacion}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F8F9FA", // Fondo más claro para un look moderno
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#031674", // Color principal destacado
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: "Roboto", // Fuentes más modernas
    },
    subtitle: {
        fontSize: 18,
        color: "#6C757D", // Gris suave para el subtítulo
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: "Roboto",
    },
    list: {
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: "#FFFFFF", // Fondo blanco para los cards
        borderRadius: 15,
        padding: 20,
        marginVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5, // Sombra suave para un diseño más pulido
    },
    subject: {
        fontSize: 20,
        fontWeight: "600",
        color: "#031674", // Título de la materia con color principal
        marginBottom: 10,
        fontFamily: "Roboto",
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    detail: {
        fontSize: 16,
        color: "#495057", // Gris oscuro para los detalles
        fontFamily: "Roboto",
    },
});
