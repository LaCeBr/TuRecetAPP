import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
//import { baseUrl } from '../comun/comun'; 
import axios from 'axios';
//import { addComentarios } from '../redux/ActionCreators';
import { connect } from 'react-redux';

/*
mapStateToProps = state => { 
    return {  
        Usuario: state.Usuario
    } 
}
*/

const mapDispatchToProps = dispatch => ({
    addComentarios: (comentario) => dispatch(addComentarios(comentario))
});

const RatingFormulario = ({ toggleModal, excursionId, addComentarios }) => {
    const [rating, setRating] = useState(5);
    const [nombre, setNombre] = useState('');
    const [comentario, setComentario] = useState('');

    const handleCancel = () => {
        setRating(5);
        setNombre('');
        setComentario('');
        toggleModal();
    };

    const handleSubmit = async () => {
        //Creamos estructura del comentario de acuerdo a la base de datos
        const nuevoComentario = {
            excursionId: excursionId,
            valoracion: rating,
            comentario: comentario,
            autor: nombre,
            dia: new Date().toISOString(),
        };
        /*//Conectamos con la base de datos e introducimos nuevo comentario
        try {
            const response = await axios.post(baseUrl+'comentarios', nuevoComentario);
            if (response.status === 201) {
                console.log('Comentario enviado con éxito');
                const comentarioConId = { ...nuevoComentario, id: response.data.id };
                addComentarios(comentarioConId);
                //onComentarioEnviado(nuevoComentario);
            } else {
                console.error('Hubo un problema al enviar el comentario');
            }
        } catch (error) {
            console.error(error);
        }*/
        
        //Valores por defecto y cerrar
        handleCancel();
    };

    return (
        <View style={styles.formContainer}>
            <Rating
                showRating
                startingValue={5}
                imageSize={40}
                onFinishRating={(value) => setRating(Math.round(value))}
                style={styles.rating}
            />

            <Input
                placeholder="Comentario"
                leftIcon={<Icon name="comment" type="font-awesome" size={24} />}
                value={comentario}
                onChangeText={setComentario}
                containerStyle={styles.input}
            />

            <View style={styles.buttonContainer}>
                <Button title="Cancelar" onPress={handleCancel} buttonStyle={styles.cancelButton} />
                <Button title="Enviar" onPress={handleSubmit} buttonStyle={styles.submitButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    rating: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    submitButton: {
        backgroundColor: 'green',
    },
});

export default connect(null, mapDispatchToProps)(RatingFormulario);
