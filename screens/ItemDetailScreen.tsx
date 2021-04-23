import React, { FunctionComponent, useEffect } from "react"
import { Image, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/Button";
import Text from "../components/Text";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/checkout";
import { RootState } from "../store/store";
import Item from "../models/item";
import { ItemsStackParamList } from "../navigation/ItemsStackNavigator";

interface ItemDetailScreenProps extends StackScreenProps<ItemsStackParamList, 'Item'> {
}

const ItemDetailScreen: FunctionComponent<ItemDetailScreenProps> = ({ navigation, route }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        imageContainer: {
            height: '50%',
            width: '100%',
            marginBottom: 16
        },
        image: {
            width: '100%',
            height: '100%'
        },
        detailsContainer: {
            flex: 1,
            marginBottom: 16
        },
        name: {
            fontFamily: 'poppins-bold',
            fontSize: 32
        },
        price: {
            fontSize: 24
        },
        description: {
            flex: 1
        },
        buttonContainer: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        button: {
            width: '80%',
            marginBottom: 16,
            padding: 16
        }
    });

    const { itemId } = route.params;
    const item = useSelector<RootState, Item | undefined>(state => state.items.itemList[itemId]);
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({ title: item?.name });
    }, [item]);

    function triggerAddToCart() {
        if (item !== undefined) {
            dispatch(addToCart(item.id));
        }
    }
    if (item === undefined) {
        return <View style={styles.container}>
            <Text>Item not found!</Text>
        </View>
    }

    return <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.getValueCurrency()}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={triggerAddToCart}>Presentear</Button>
        </View>
    </ScrollView>;
}

export default ItemDetailScreen