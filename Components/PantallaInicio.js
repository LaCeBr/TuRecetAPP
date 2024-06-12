import { addUsuario } from '@/Redux/ActionCreators';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    addUsuario: (usuario) => dispatch(addUsuario(usuario))
});

const handleAction = async (usuario, navigation, addUsuario) => {
    addUsuario(usuario);
    navigation.navigate('Navegacion');
};

const PantallaInicio = ({navigation, addUsuario}) => {

  return (
    <View style={{padding:25}}>
      <Text style={{fontSize:20}}>Bienvenido: elija forma de navegacion</Text>
      <Button
        title="Pepe"
        onPress={() => handleAction( 'Pepe', navigation, addUsuario )}
      />
      <Button
        title="Anónimo"
        onPress={() => handleAction( null, navigation, addUsuario )}
      />
    </View>
  );
};

export default connect(null, mapDispatchToProps)(PantallaInicio);
