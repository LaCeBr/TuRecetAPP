import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import DetalleReceta from "./DetalleReceta";

const Stack = createNativeStackNavigator();

function Lista(props) {

    const renderReceta = ({ item, index }) => {
        return (
            <ListItem
            key={index}
            onPress={() => props.navigation.navigate('DetalleReceta', { RecetaId: item.id })}
            bottomDivider>
                <Avatar source={{ uri: item.foto }} />
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{item.titulo}</ListItem.Title>
                    <ListItem.Subtitle>
                        {item.valoracion ? `${item.valoracion} / 5` : 'Sin valorar'}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={props.listado}
                renderItem={renderReceta}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

function ListaRecetas({listado}){
    return(
        <Stack.Navigator>
            <Stack.Screen name="ListaRecetas" options={{ headerShown: false }}>{props => <Lista {...props} listado={listado} />}</Stack.Screen>
            <Stack.Screen name="DetalleReceta" >{props => <DetalleReceta {...props} listado={listado} />}</Stack.Screen>
        </Stack.Navigator>
    );
}

export default ListaRecetas;
