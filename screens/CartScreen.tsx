import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Text from "../components/Text";
import CheckoutStackParamList from "../navigators/CheckoutStackParamList";

export default class CartScreen extends Component<StackScreenProps<CheckoutStackParamList, 'Cart'>> {
    private styles = StyleSheet.create({
        container: {
            paddingHorizontal: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    render() {
        return <View style={this.styles.container}>
            <Text>Seu carrinho está vazio!</Text>
        </View>;
    }
}