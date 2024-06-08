import * as ActionTypes from './ActionTypes';

export const Recetas = (state = { errMess: null, recetas:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RECETAS:
            return {...state, isLoading: false, errMess: null, recetas: action.payload};

        case ActionTypes.RECETAS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};