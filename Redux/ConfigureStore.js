import { configureStore } from '@reduxjs/toolkit'
import { Comentarios } from './Comentarios';
import { Recetas } from './Recetas';
import { Usuario } from './Usuario';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            Comentarios: Comentarios,
            Recetas: Recetas,
            Usuario: Usuario,
        },
    });

    return store;
}