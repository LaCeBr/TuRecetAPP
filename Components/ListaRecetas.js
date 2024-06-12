import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListItem, Avatar, Text } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import DetalleReceta from "./DetalleReceta";
import Rating from './Rating';
import ListaComentarios from './ListaComentarios';
import { connect } from 'react-redux';

mapStateToProps = state => { 
    return { 
        Recetas: state.Recetas.recetas
    } 
} 

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
                    {item.valoracion ? (
                            <Rating rating={item.valoracion} />
                        ) : (
                            <Text>Sin valorar</Text>
                        )}
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

const ListaRecetas = (props) => {

    if (!props.listado){
        var listado = props.Recetas;
        //console.log(listado);
    }else{
        var listado = props.listado;
    }
    
    return(
        <Stack.Navigator initialRouteName= "ListaRecetas">
            <Stack.Screen name="ListaRecetas" options={{ headerShown: false }}>{props => <Lista {...props} listado={listado} />}</Stack.Screen>
            <Stack.Screen name="DetalleReceta" >{props => <DetalleReceta {...props} listado={listado} />}</Stack.Screen>
            <Stack.Screen name="ListaComentarios" component={ListaComentarios}/>
        </Stack.Navigator>
    );
}

export default connect(mapStateToProps)(ListaRecetas);
