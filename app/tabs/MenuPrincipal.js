import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListaRecetas from "../../Components/ListaRecetas";
import { Text } from 'react-native';

function MenuPrincipal(){
    
    const [RecetasFirebase, setRecetasFirebase] = useState([]);
    
    useEffect(() => {
        //Firebase
        axios.get('https://tureceptapp-default-rtdb.europe-west1.firebasedatabase.app/Recetas.json')        
        .then((response) => {
            let arrayProductos = [];
            for(let key in response.data) {
                arrayProductos.push({
                    id: key,
                    autor: response.data[key].Autor,
                    foto: response.data[key].Foto,
                    ingredientes: response.data[key].Ingredientes,
                    instrucciones: response.data[key].Instrucciones,
                    titulo: response.data[key].Titulo,
                    valoracion: response.data[key].Valoracion,
                    video: response.data[key].Video
                });
            }
            setRecetasFirebase(arrayProductos);
        })
        .catch((error) => {
            setRecetasFirebase([]);
        });
    }, []);

    if (RecetasFirebase.length==0){
        return(
            <Text style={{margin:"auto"}}>No hay conexión con la base de datos</Text>
        )
    }else{
        return (
            <ListaRecetas listado={RecetasFirebase} />
        );        
    }
}

export default MenuPrincipal;