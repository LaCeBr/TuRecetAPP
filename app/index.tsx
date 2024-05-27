import * as React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MisCreaciones from "./tabs/MisCreaciones";
import MenuPrincipal from "./tabs/MenuPrincipal";
import Archivadas from "./tabs/Archivadas";

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={MenuPrincipal} />
        <Tab.Screen name="Mis Creaciones" component={MisCreaciones} />
        <Tab.Screen name="Archivo" component={Archivadas} />
      </Tab.Navigator>
    </SafeAreaProvider>    
  );
}
