import React from 'react';
import ListaRecetas from "../../Components/ListaRecetas";
import { Text } from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = state => { 
    return { 
        Recetas: state.Recetas.recetas, 
        Comentarios: state.Comentarios
    } 
} 

const MenuPrincipal = (props) =>{
    const RecetasDisponibles = props.Recetas;

    if (RecetasDisponibles.length==0){
        return(
            <Text style={{margin:"auto"}}>No hay conexión con la base de datos</Text>
        )
    }else{
        return (
            <ListaRecetas listado={RecetasDisponibles} />
        );        
    }
}

export default connect(mapStateToProps)(MenuPrincipal);