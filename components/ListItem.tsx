import React, { FunctionComponent } from "react";
import { GestureResponderEvent, Image, StyleSheet, ViewProps, Pressable, Dimensions } from "react-native";
import Item from "../models/item";
import Card from "./Card";
import Text from "./Text";

interface ListItemProps extends ViewProps {
    item: Item;
    onPress(event: GestureResponderEvent): void;
}

const ListItem: FunctionComponent<ListItemProps> = ({ style, onPress, item }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            paddingBottom: 8,
            overflow: 'hidden'
        },
        touchContainer: {
            flex: 1,
            width: '100%',
        },
        image: {
            width: '100%',
            height: Dimensions.get('window').height / 5,
            marginBottom: 8
        },
        text: {
            textAlign: 'center'
        },
        name: {
            fontSize: 18
        },
        price: {
            fontFamily: 'poppins-bold',
        },
        buttonContainer: {
            width: '40%'
        }
    });

    return <Card style={{ ...styles.container, ...(style || {}) }}>
        <Pressable style={styles.touchContainer} onPress={onPress}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={{ ...styles.text, ...styles.name }}>{item.name}</Text>
            <Text style={{ ...styles.text, ...styles.price }}>{item.getValueCurrency()}</Text>
        </Pressable>
    </Card>;
}

export default ListItem