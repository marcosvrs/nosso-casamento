import React, { Component } from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/Button";
import Text from "../components/Text";
import { ITEMS } from "../data/dummy-items";
import Item from "../models/item";
import RootStackParamList from "../navigators/RootStackParamList";

export default class ItemScreen extends Component<StackScreenProps<RootStackParamList, 'Item'>> {
    private item?: Item;
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        imageContainer: {
            flex: 1
        },
        image: {
            flex: 1,
            resizeMode: 'contain'
        },
        button: {
            width: '40%',
            height: 50,
            marginVertical: 16
        }
    });
    static navigationOptions(props: {
        route: RouteProp<RootStackParamList, 'Item'>;
        navigation: any;
    }) {
        const itemId = props.route.params.itemId;
        const item = ITEMS.find((item) => item.id === itemId);

        return {
            title: item?.name
        }
    }

    constructor(props: StackScreenProps<RootStackParamList, 'Item'>) {
        super(props);
        const itemId = props.route.params.itemId;
        this.item = ITEMS.find((item) => item.id === itemId);
    }

    render() {
        if (this.item === undefined) {
            return <View style={this.styles.container}>
                <Text>Item not found!</Text>
            </View>
        }

        return <View style={this.styles.container}>
            <View style={this.styles.imageContainer}>
                <Image style={this.styles.image} source={this.item.image} />
            </View>
            <Text>{this.item.name}</Text>
            <Text>R${this.item.value}</Text>
            <Button style={this.styles.button}>Comprar</Button>
        </View>;
    }
}