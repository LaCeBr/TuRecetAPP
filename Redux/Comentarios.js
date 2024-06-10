import * as ActionTypes from './ActionTypes';

export const Comentarios = (state = { errMess: null, comentarios:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMENTARIOS:
            return {...state, isLoading: false, errMess: null, comentarios: action.payload};

        case ActionTypes.COMENTARIOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.NUEVO_COMENTARIO:
            const { receta_id, usuario_id, valoracion } = action.payload;
            return {
                ...state,
                comentarios: {
                    ...state.comentarios,
                    [receta_id]: {
                        ...state.comentarios[receta_id],
                        [usuario_id]: valoracion
                    }
                }
            };

        default:
            return state;
    }
};