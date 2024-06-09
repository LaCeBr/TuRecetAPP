import React, { useRef } from 'react';
import { Card, ListItem, Text } from '@rneui/themed';
import { ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Rating from './Rating';

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

const ListaComentarios = (props) => {
    const { id_lista, titulo } = props;
    const comentarios = props.Comentarios.comentarios[id_lista];
    
    if(!comentarios) {
        return (
            <Card>
                <Card.Title>{titulo}</Card.Title> 
                <Text>Todavía no hay valoraciones en esta receta</Text> 
            </Card>)
    }else{

        // Filtrar sólo las claves que no sean 'Media'
        const comentarioKeys = Object.keys(comentarios)
        const comentarioList = comentarioKeys.map(key => ({
            id: key,
            ...comentarios[key]
        }));

        return(
            <ScrollView ref={useRef(null)}>
                <Card>
                    <Card.Title>{titulo}</Card.Title> 
                    <Card.Divider/> 
                    <FlatList
                        scrollEnabled={false}
                        data={comentarioList}
                        renderItem={({ item }) => <RenderComentarioItem comentario={item} />}
                        keyExtractor={item => (item.id ? item.id.toString() : Date.now().toString())}
                    />
                </Card>
            </ScrollView>
        );

    } 
}

export default connect (mapStateToProps) (ListaComentarios);
