import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from '@rneui/themed';
// import { baseUrl } from '../comun/comun'; 
import axios from 'axios';
import { connect } from 'react-redux';
import { nuevoComentario } from '../Redux/ActionCreators';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';


mapStateToProps = state => { 
    return {  
        Usuario:state.Usuario.usuario
    } 
}

const mapDispatchToProps = dispatch => ({
    // nuevoComentario: (receta_id, usuario_id, valoracion, Puntuacion) => dispatch(nuevoComentario(receta_id, usuario_id, valoracion, Puntuacion))
});

const NuevaReceta = ({ toggleReceta }) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [instrucciones, setInstrucciones] = useState('');
    const [valoracion, setValoracion] = useState('');
    const [foto, setFoto] = useState(null);

    const agregarIngrediente = () => {
        setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
    };

    const seleccionarFoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        
    };

    const handleSave = () => {
        const nuevaReceta = {
            id: Date.now().toString(),
            titulo,
            autor,
            ingredientes,
            instrucciones,
            valoracion: Number(valoracion),
            foto,
        };

        if (route.params && route.params.guardarReceta) {
            route.params.guardarReceta(nuevaReceta);
        }

        showAlert('Receta guardada con éxito!');
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Título de la receta"
            />

            <Text style={styles.label}>Autor:</Text>
            <TextInput
                style={styles.input}
                value={autor}
                onChangeText={setAutor}
                placeholder="Autor de la receta"
            />

            <Text style={styles.label}>Ingredientes:</Text>
            {ingredientes.map((ingrediente, index) => (
                <View key={index} style={styles.ingredientContainer}>
                    <TextInput
                        style={styles.ingredientInput}
                        value={ingrediente.nombre}
                        onChangeText={(text) => {
                            const newIngredientes = [...ingredientes];
                            newIngredientes[index].nombre = text;
                            setIngredientes(newIngredientes);
                        }}
                        placeholder={`Ingrediente ${index + 1}`}
                    />
                    <TextInput
                        style={styles.quantityInput}
                        value={ingrediente.cantidad}
                        onChangeText={(text) => {
                            const newIngredientes = [...ingredientes];
                            newIngredientes[index].cantidad = text;
                            setIngredientes(newIngredientes);
                        }}
                        placeholder="Cantidad"
                    />
                </View>
            ))}
            <Button title="Agregar Ingrediente" onPress={agregarIngrediente} />

            <Text style={styles.label}>Instrucciones:</Text>
            <TextInput
                style={styles.input}
                value={instrucciones}
                onChangeText={setInstrucciones}
                placeholder="Instrucciones de la receta"
                multiline
            />

            <Text style={styles.label}>Valoración:</Text>
            <TextInput
                style={styles.input}
                value={valoracion}
                onChangeText={setValoracion}
                placeholder="Valoración (0-5)"
                keyboardType="numeric"
            />

            <Button title="Seleccionar Foto" onPress={seleccionarFoto} />
            {foto && <Text style={styles.fotoText}>Foto seleccionada</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Guardar Receta" onPress={handleSave} buttonStyle={{backgroundColor: 'green'}}/>
                <Button title="Cancelar" onPress={toggleReceta} buttonStyle={{backgroundColor: 'red'}} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
        backgroundColor: '#f8f8f8',
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientInput: {
        flex: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    quantityInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    fotoText: {
        marginVertical: 10,
        fontSize: 16,
        color: 'green',
    },
    buttonContainer: {
        paddingVertical:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NuevaReceta);
