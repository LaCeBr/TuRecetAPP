import React, { useState, useRef } from 'react';
import { Card, ListItem, Text, Button } from '@rneui/themed';
import { ScrollView, FlatList, Modal, View } from 'react-native';
import { connect } from 'react-redux';
import Rating from './Rating';
import RatingFormulario from './RatingFormulario';

mapStateToProps = state => { 
    return {  
        Comentarios: state.Comentarios
    } 
}

function RenderComentarioItem({comentario}) {
    
    return(
        <ListItem bottomDivider>
            <ListItem.Content>
                <Rating rating={comentario.Puntuacion} />
                <ListItem.Title>{comentario.Comentario}</ListItem.Title>
                <Text style={{marginTop: 5, color: 'gray'}}>-- {comentario.id}</Text>
            </ListItem.Content>
        </ListItem>
    );
}

function ContenidoComentario({comentarios}){
    
    console.log(comentarios);
    if(!comentarios) {
        return (
            <Text>Todavía no hay valoraciones en esta receta</Text> 
        )
    }else{
        // Filtrar sólo las claves que no sean 'Media'
        const comentarioKeys = Object.keys(comentarios)
        const comentarioList = comentarioKeys.map(key => ({
            id: key,
            ...comentarios[key]
        }));

        return(
            <FlatList
                scrollEnabled={false}
                data={comentarioList}
                renderItem={({ item }) => <RenderComentarioItem comentario={item} />}
                keyExtractor={item => (item.id ? item.id.toString() : Date.now().toString())}
            />
        );

    } 
}

const ListaComentarios = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const { route } = props;
    const { id_lista, titulo } = route.params;
    const comentarios = props.Comentarios.comentarios[id_lista];
    console.log(comentarios);

    return(
        <ScrollView ref={useRef(null)}>
            <Card>
                <Card.Title>{titulo}</Card.Title> 
                <Card.Divider/> 
                <Button onPress={toggleModal}>Añadir Comentario</Button>
                <ContenidoComentario
                    comentarios = {comentarios}
                />
                <Modal 
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={toggleModal}>
                    <View style={{flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <RatingFormulario toggleModal={toggleModal} RecetaId = {id_lista}/>
                    </View>
                </Modal> 
            </Card>
        </ScrollView>
    );
}

export default connect (mapStateToProps) (ListaComentarios);
