import React, { Component } from "react"
import { Image, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/Button";
import Text from "../components/Text";
import { ITEMS } from "../data/dummy-items";
import Item from "../models/item";
import RootStackParamList from "../navigators/RootStackParamList";
import { ScrollView } from "react-native-gesture-handler";

export default class ItemDetailScreen extends Component<StackScreenProps<RootStackParamList, 'Item'>> {
    private item?: Item;
    private styles = StyleSheet.create({
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
            height: '100%',
            resizeMode: 'contain'
        },
        detailsContainer: {
            marginBottom: 16
        },
        name: {
            fontFamily: 'poppins-bold',
            fontSize: 32
        },
        price: {
            fontSize: 24
        },
        description: {},
        buttonContainer: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        button: {
            width: '40%',
            height: 50
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

        return <ScrollView contentContainerStyle={this.styles.container}>
            <View style={this.styles.imageContainer}>
                <Image style={this.styles.image} source={this.item.image} />
            </View>
            <View style={this.styles.detailsContainer}>
                <Text style={this.styles.name}>{this.item.name}</Text>
                <Text style={this.styles.price}>{this.item.getValueCurrency()}</Text>
                <Text style={this.styles.description}>{this.item.description}</Text>
            </View>
            <View style={this.styles.buttonContainer}>
                <Button style={this.styles.button}>Comprar</Button>
            </View>
        </ScrollView>;
    }
}