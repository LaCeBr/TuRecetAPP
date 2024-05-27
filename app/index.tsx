import { Text, View } from "react-native";
import MenuPrincipal from "./tabs/MenuPrincipal";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <MenuPrincipal/>
      </View>
    </SafeAreaProvider>
  );
}
