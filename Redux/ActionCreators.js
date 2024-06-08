import * as ActionTypes from './ActionTypes';

datosURL = 'https://tureceptapp-default-rtdb.europe-west1.firebasedatabase.app/';

export const fetchComentarios = () => (dispatch) => {
    return fetch(datosURL + 'Comentarios.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comentarios => dispatch(addComentarios(comentarios)))
    .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

export const fetchRecetas = () => (dispatch) => {
    return fetch(datosURL + 'Recetas.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(recetas => {
      let arrayProductos = [];
      for(let key in recetas) {
          arrayProductos.push({
            id: key,
            autor: recetas[key].Autor,
            foto: recetas[key].Foto,
            ingredientes: recetas[key].Ingredientes,
            instrucciones: recetas[key].Instrucciones,
            titulo: recetas[key].Titulo,
            valoracion: recetas[key].Valoracion,
            video: recetas[key].Video
          })
      }
      dispatch(addRecetas(arrayProductos))
    })
    .catch(error => dispatch(recetasFailed(error.message)));
};

export const recetasFailed = (errmess) => ({
    type: ActionTypes.RECETAS_FAILED,
    payload: errmess
});

export const addRecetas = (recetas) => ({
    type: ActionTypes.ADD_RECETAS,
    payload: recetas
});