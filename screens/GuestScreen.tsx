import { StackScreenProps } from "@react-navigation/stack"
import React, { Component } from "react"
import { Keyboard, Pressable, StyleSheet, View } from "react-native"
import Button from "../components/Button"
import GuestForm from "../components/GuestForm"
import Input from "../components/Input"
import Text from "../components/Text"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"


export default class GuestScreen extends Component<StackScreenProps<CheckoutStackParamList, 'Guest'>> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        guestForm: {
            flex: 1,
            width: '80%'
        },
        paymentButton: {
            width: '80%',
            marginBottom: 16,
            padding: 16
        }
    });

    render() {
        return <Pressable style={this.styles.container} onPress={() => Keyboard.dismiss()}>
            <GuestForm style={this.styles.guestForm} />
            <Button style={this.styles.paymentButton} onPress={() => { this.props.navigation.navigate('Payment') }}>Pagar</Button>
        </Pressable>
    }
}