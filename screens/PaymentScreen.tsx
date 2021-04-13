import React, { FunctionComponent } from "react"
import { StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import Text from "../components/Text"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

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

    const checkout = useSelector<RootState>(state => state.checkout);

    return <View style={styles.container}>
        {/* <Text style={styles.text}>Hora de pagar! 🤑</Text> */}
        <Text style={styles.text}>{JSON.stringify(checkout)}</Text>
    </View>
}

export default PaymentScreen