import { StackScreenProps } from "@react-navigation/stack"
import React, { Component } from "react"
import { View } from "react-native"
import Text from "../components/Text"
import CheckoutStackParamList from "../navigations/CheckoutStackParamList"


export default class GuestScreen extends Component<StackScreenProps<CheckoutStackParamList, 'Guest'>> {
    render() {
        return <View>
            <Text>Hello Guest!</Text>
        </View>
    }
}