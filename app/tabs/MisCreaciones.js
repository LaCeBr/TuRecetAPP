import React, {useState} from 'react';
import ListaRecetas from "../../Components/ListaRecetas";
import { Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';
import NuevaReceta from '../../Components/NuevaReceta'
import { Button } from '@rneui/themed';

mapStateToProps = state => { 
    return { 
        Recetas: state.Recetas.recetas,
        Propias: state.Recetas.recetas.filter(receta => receta.autor === 'Pepe'), 
        Comentarios: state.Comentarios
    } 
} 

function RenderLista({Propias}){
    
    if (Propias.length==0){
        return(
            <Text style={{margin:"auto"}}>Todavía no tienes recetas creadas</Text>
        )
    }else{
        return (
            <ListaRecetas listado={Propias} />
        );        
    }

}

const MisCreaciones = (props) => {

    const [plantillaReceta, setPlantillaReceta] = useState(false);
    
    const toggleReceta = () => {
        setPlantillaReceta(!plantillaReceta);
    };

    if (props.Recetas.length==0){
        return(
            <Text style={{margin:"auto"}}>No hay conexión con la base de datos</Text>
        )
    }else{
        return(
            <View>
                <Button onPress={toggleReceta}>"Crear Receta"</Button>
                <RenderLista Propias={props.Propias}/>
                <Modal 
                    visible={plantillaReceta}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={toggleReceta}>
                    <View style={{flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        width: '100%'}}>
                        <NuevaReceta toggleReceta={toggleReceta} />
                    </View>
                </Modal> 
            </View>
        );
    }
}

export default connect(mapStateToProps)(MisCreaciones);