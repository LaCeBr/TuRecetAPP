import * as ActionTypes from './ActionTypes';

export const Usuario = (state = { errMess: null, usuario:null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USUARIO:
            return {...state, errMess: null, usuario: action.payload};

        case ActionTypes.USUARIO_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};