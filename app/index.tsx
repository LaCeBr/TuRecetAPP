import * as React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ConfigureStore } from '../Redux/ConfigureStore';
import { Provider } from 'react-redux';
import CampoBase from '../Components/CampoBase';

const store = ConfigureStore();

export default function Index() {
  return (
    <Provider store={store}>  
      <SafeAreaProvider>
        <CampoBase/>
      </SafeAreaProvider>   
    </Provider> 
  );
}
