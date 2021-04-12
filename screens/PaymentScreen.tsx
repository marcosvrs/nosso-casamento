import { StackScreenProps } from "@react-navigation/stack"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import Text from "../components/Text"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"


export default class PaymentScreen extends Component<StackScreenProps<CheckoutStackParamList, 'Guest'>> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 24
        }
    });

    render() {
        return <View style={this.styles.container}>
            <Text style={this.styles.text}>Hora de pagar! 🤑</Text>
        </View>
    }
}