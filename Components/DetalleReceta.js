import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from '@rneui/themed';

function DetalleLista({ listado, route, navigation }) {
    const { RecetaId } = route.params;
    const receta = listado[RecetaId];
    const instrucciones_ = receta.instrucciones.replace(/\|/g, '\n\n');

    useEffect(() => {
        navigation.setOptions({
            title: receta.titulo
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
