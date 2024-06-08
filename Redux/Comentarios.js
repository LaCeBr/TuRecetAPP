import * as ActionTypes from './ActionTypes';

export const Comentarios = (state = { errMess: null, comentarios:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMENTARIOS:
            return {...state, isLoading: false, errMess: null, comentarios: action.payload};

        case ActionTypes.COMENTARIOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};