import React, { FunctionComponent } from "react"
import { StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"

const PaymentScreen: FunctionComponent<StackScreenProps<CheckoutStackParamList, 'Guest'>> = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 24
        }
    });

    return <View style={styles.container}>
    </View>
}

export default PaymentScreen