import React, { useEffect, useState } from 'react';
import ListaRecetas from "../../Components/ListaRecetas";
import * as SecureStore from 'expo-secure-store';

async function RecuperarReceta(id) {
    let recetaCompleta = '';
    let i = 0;

    while (true) {
        const chunk = await SecureStore.getItemAsync(`${id}_${i}`);
        if (chunk === null) break;
        recetaCompleta += chunk;
        i++;
    }
    return JSON.parse(recetaCompleta);
}

async function RecuperarTodasLasRecetas() {
    let ids = await SecureStore.getItemAsync('recetas_almacenadas');
    ids = ids ? JSON.parse(ids) : [];

    const recetas = [];
    for (const id of ids) {
        const receta = await RecuperarReceta(id);
        recetas.push({ 
            id: id, 
            autor: receta.autor,
            foto: receta.foto,
            ingredientes: receta.ingredientes,
            instrucciones: receta.instrucciones,
            titulo: receta.titulo,
            valoracion: receta.valoracion,
            video: receta.video 
        });
    }
    return recetas;
}


function Archivadas(){
    
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        const fetchRecetas = async () => {
            const todasLasRecetas = await RecuperarTodasLasRecetas();
            setRecetas(todasLasRecetas);
        };

        fetchRecetas();
    }, []);

    return (
        <ListaRecetas listado={recetas} />
    );
}

export default Archivadas;