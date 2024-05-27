import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';

function ListaRecetas(props) {

    const renderReceta = ({ item, index }) => {
        return (
            <ListItem
                bottomDivider>
                <Avatar source={{ uri: item.foto }} />
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{item.titulo}</ListItem.Title>
                    <ListItem.Subtitle>
                        {item.valoracion ? `${item.valoracion} estrellas` : 'Sin valorar'}
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

export default ListaRecetas;
