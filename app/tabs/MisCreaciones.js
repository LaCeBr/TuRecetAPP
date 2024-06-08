import React from 'react';
import ListaRecetas from "../../Components/ListaRecetas";
import { Text } from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = state => { 
    return { 
        Recetas: state.Recetas.recetas,
        Propias: state.Recetas.recetas.filter(receta => receta.autor === 'Bego'), 
        Comentarios: state.Comentarios
    } 
} 

const MisCreaciones = (props) => {
    
    if (props.Recetas.length==0){
        return(
            <Text style={{margin:"auto"}}>No hay conexión con la base de datos</Text>
        )
    }else if (props.Propias.length==0){
        return(
            <Text style={{margin:"auto"}}>Todavía no tienes recetas creadas</Text>
        )
    }else{
        return (
            <ListaRecetas listado={props.Propias} />
        );        
    }
}

export default connect(mapStateToProps)(MisCreaciones);