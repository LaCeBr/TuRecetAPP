import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLdP0olu6cv-H7yfuII4hi7tloQdRyHWc",
    authDomain: "tureceptapp.firebaseapp.com",
    databaseURL: "https://tureceptapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tureceptapp",
    storageBucket: "tureceptapp.appspot.com",
    messagingSenderId: "753282151970",
    appId: "1:753282151970:web:a68733921209641806fc7b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // si ya está inicializado, usa esa instancia
}

export default firebase;
