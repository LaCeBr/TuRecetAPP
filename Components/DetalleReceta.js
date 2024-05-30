import React, { useEffect, useRef, useState } from 'react';
import { Text, Image, ScrollView, StyleSheet, Alert, View } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

function showAlert(message) {
    Alert.alert(message);
}

async function GuardarReceta(receta, id) {
    try {
        const recetaString = JSON.stringify(receta);
        const chunks = chunkString(recetaString, 2000);

        for (let i = 0; i < chunks.length; i++) {
            await SecureStore.setItemAsync(`${id}_${i}`, chunks[i]);
        }

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

async function EliminarReceta(id) {
    try {
        let ids = await SecureStore.getItemAsync('recetas_almacenadas');
        ids = ids ? JSON.parse(ids) : [];
        const filteredIds = ids.filter(item => item !== id);
        await SecureStore.deleteItemAsync('recetas_almacenadas');
        if (filteredIds.length > 0) {
            await SecureStore.setItemAsync('recetas_almacenadas', JSON.stringify(filteredIds));
        }

        let i = 0;
        while (true) {
            const key = `${id}_${i}`;
            const value = await SecureStore.getItemAsync(key);
            if (value === null) break;
            await SecureStore.deleteItemAsync(key);
            i++;
        }

        showAlert('Receta eliminada!');
    } catch (e) {
        console.log('Error: ', e);
        showAlert("Error al eliminar la receta. Intentelo de nuevo más tarde");
    }
}

async function descargarPDF(receta) {
    const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    line-height: 1.6;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                }
                .subTitle {
                    font-size: 18px;
                    margin-bottom: 5px;
                }
                .header {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .ingredient {
                    font-size: 16px;
                    margin-bottom: 2px;
                }
                .instructions {
                    font-size: 16px;
                    margin: 10px 0;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <div class="title">${receta.titulo}</div>
            <img src="${receta.foto}" style="width: 100%; height: auto;" />
            <div class="subTitle">Autor: ${receta.autor}</div>
            <div class="subTitle">Valoración: ${receta.valoracion ? `${receta.valoracion} / 5` : 'Sin valorar'}</div>
            <div class="header">Ingredientes:</div>
            ${Object.keys(receta.ingredientes).map(key => `
                <div class="ingredient">${key}: ${receta.ingredientes[key]}</div>
            `).join('')}
            <div class="header">Instrucciones:</div>
            <div class="instructions">${receta.instrucciones.replace(/\|/g, '<br><br>')}</div>
        </body>
        </html>
    `;

    try {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });

        // Generar el nombre de archivo
        const fileName = `${receta.titulo.replace(/\s+/g, '_').toLowerCase()}.pdf`;
        const newUri = `${FileSystem.documentDirectory}${fileName}`;

        // Mover el archivo generado al nuevo nombre
        await FileSystem.moveAsync({
            from: uri,
            to: newUri,
        });

        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
            const asset = await MediaLibrary.createAssetAsync(newUri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
            showAlert('PDF descargado correctamente');
        } else {
            showAlert('Permiso para acceder al almacenamiento denegado');
        }
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        showAlert('Error al generar el archivo PDF.');
    }
}

function DetalleLista({ listado, route, navigation }) {
    const { RecetaId } = route.params;
    const receta = listado.find(receta => receta.id === RecetaId);
    const instrucciones_ = receta.instrucciones.replace(/\|/g, '\n\n');
    const scrollViewRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            title: receta.titulo
        });
    }, [navigation, RecetaId]);

    return (
        <ScrollView style={styles.container} ref={scrollViewRef}>
            <Card>
                <View style={{ flexDirection: 'row', paddingBottom: 10, marginLeft: "auto" }}>
                    <Button onPress={() => GuardarReceta(receta, RecetaId)}>
                        <Icon name="archive-arrow-down" type="material-community" size={30} color="#000" />
                    </Button>
                    <Button onPress={() => EliminarReceta(RecetaId)}>
                        <Icon name="archive" type="material-community" size={30} color="#000" />
                    </Button>
                    <Button onPress={() => descargarPDF(receta)}>
                        <Icon name="file-download" type="material-community" size={30} color="#000" />
                    </Button>
                </View>
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
