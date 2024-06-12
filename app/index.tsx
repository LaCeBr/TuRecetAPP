import * as React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ConfigureStore } from '../Redux/ConfigureStore';
import { Provider } from 'react-redux';
import CampoBase from '../Components/CampoBase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaInicio from '../Components/PantallaInicio';

const store = ConfigureStore();
const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Provider store={store}>  
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName= "Inicio">
          <Stack.Screen name='Inicio' component={PantallaInicio}/>
          <Stack.Screen name='Navegacion' component={CampoBase} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </SafeAreaProvider>   
    </Provider> 
  );
}
