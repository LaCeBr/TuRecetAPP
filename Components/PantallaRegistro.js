import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firebase from './firebaseConfig'; // Asegúrate de que la ruta sea correcta

const PantallaRegistro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Usuario registrado!', `Bienvenido ${email}`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
  
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Registrar" onPress={handleRegister} />
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 12,
    },
});
  
export default PantallaRegistro;
