import React, { useEffect } from 'react';
import { Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';

function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

function showAlert(message) {
    Alert.alert(message);
}

async function GuardarReceta(receta, id){
    try {
        const recetaString = JSON.stringify(receta);
        // Dividir la receta en partes más pequeñas
        const chunks = chunkString(recetaString, 2000); 

        for (let i = 0; i < chunks.length; i++) {
            await SecureStore.setItemAsync(`${id}_${i}`, chunks[i]);
        }
        // Añadir el ID de la receta a la lista de IDs
        let ids = await SecureStore.getItemAsync('recetas_almacenadas');
        ids = ids ? JSON.parse(ids) : [];
        if (!ids.includes(id)) {
            ids.push(id);
            await SecureStore.setItemAsync('recetas_almacenadas', JSON.stringify(ids));
        }

        showAlert('Receta guardada!');
    } catch (e) {
        console.log('Error: ', e);
        showAlert("Error al guardar la receta. Intentelo de nuevo más tarde");
    }
}

function comprobarAlmacenajeReceta(id){

}

function DetalleLista({ listado, route, navigation }) {
    const { RecetaId } = route.params;
    const receta = listado.find(receta => receta.id === RecetaId);
    const instrucciones_ = receta.instrucciones.replace(/\|/g, '\n\n');

    useEffect(() => {
        navigation.setOptions({
            title: receta.titulo,
            headerRight: () => (
                <Button onPress={() => GuardarReceta(receta, RecetaId)}>
                    <Icon name="archive-arrow-down" type="material-community" size={30} color="#000" />
                </Button>
            ),
        });
    }, [navigation, RecetaId]);

    return (
        <ScrollView style={styles.container}>
            <Card>
                <Image source={{ uri: receta.foto }} style={styles.image} />
                <Text style={styles.subTitle}>Autor: {receta.autor}</Text>
                <Text style={styles.subTitle}>Valoración: {receta.valoracion ? `${receta.valoracion} / 5` : 'Sin valorar'}</Text>
                <Card.Divider />
                <Text style={styles.header}>Ingredientes:</Text>
                {Object.keys(receta.ingredientes).map((key, index) => (
                    <Text key={index} style={styles.ingredient}>{key}: {receta.ingredientes[key]}</Text>
                ))}
                <Card.Divider />
                <Text style={styles.header}>Instrucciones:</Text>
                <Text style={styles.instructions}>{instrucciones_}</Text>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 18,
        marginVertical: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 2,
    },
    instructions: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'justify',
    },
});

export default DetalleLista;
