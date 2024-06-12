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

export const actualizarValoracion = (RecetaId, Valoracion) => {
    return (dispatch) => {
        return fetch(`${datosURL}Recetas/${RecetaId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Valoracion })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            dispatch({
                type: ActionTypes.NUEVA_VALORACION,
                payload: { RecetaId, Valoracion }
            });
        })
        .catch(error => {
            console.error('Error posting comment to Firebase:', error);
        });
    };
};

export const nuevoComentario = (RecetaId, usuario_id, valoracion, Puntuacion) => {
    return (dispatch) => {
        const receta_id = "id_" + RecetaId;
        return fetch(`${datosURL}Comentarios/${receta_id}/${usuario_id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valoracion)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            dispatch({
                type: ActionTypes.NUEVO_COMENTARIO,
                payload: { receta_id, usuario_id, valoracion }
            });
            
            dispatch(actualizarValoracion(RecetaId, Puntuacion)); 
        })
        .catch(error => {
            console.error('Error posting comment to Firebase:', error);
        });
    };
};


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

export const usuarioFailed = (errmess) => ({
    type: ActionTypes.USUARIO_FAILED,
    payload: errmess
});

export const addUsuario = (usuario) => ({
    type: ActionTypes.ADD_USUARIO,
    payload: usuario
});