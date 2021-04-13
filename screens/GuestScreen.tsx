import React, { FunctionComponent } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native"
import GuestForm from "../components/GuestForm"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"
import { ScrollView } from "react-native-gesture-handler"

const GuestScreen: FunctionComponent<StackScreenProps<CheckoutStackParamList, 'Guest'>> = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        guestForm: {
            flex: 1,
            width: '100%'
        }
    });

    function onSubmit() {
        navigation.navigate('Payment');
    }

    return <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
        <ScrollView>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <GuestForm style={styles.guestForm} onSubmit={onSubmit} />
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView >;
}

export default GuestScreen