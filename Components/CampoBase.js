import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MisCreaciones from "../app/tabs/MisCreaciones";
import MenuPrincipal from "../app/tabs/MenuPrincipal";
import Archivadas from "../app/tabs/Archivadas";
import { fetchComentarios, fetchRecetas } from '../Redux/ActionCreators';

mapStateToProps = state => { 
    return { 
        Recetas: state.Recetas, 
        Comentarios: state.Comentarios, 
        Usuario: state.Usuario
    } 
} 

const mapDispatchToProps = dispatch => ({ 
    fetchRecetas: () => dispatch(fetchRecetas()), 
    fetchComentarios: () => dispatch(fetchComentarios())
});

const Tab = createMaterialTopTabNavigator();

class CampoBase extends Component {
    componentDidMount() { 
        this.props.fetchRecetas(); 
        this.props.fetchComentarios(); 
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Menu" component={MenuPrincipal} />
                <Tab.Screen name="Mis Creaciones" component={MisCreaciones} />
                <Tab.Screen name="Archivo" component={Archivadas} />
            </Tab.Navigator>    
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampoBase);
