import React, { FunctionComponent } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native"
import CheckoutStackParamList from "../navigation/CheckoutStackParamList"
import { ScrollView } from "react-native-gesture-handler"
import AuthForm from "../components/AuthForm"

const AuthScreen: FunctionComponent<StackScreenProps<CheckoutStackParamList, 'Auth'>> = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        authForm: {
            flex: 1,
            width: '100%'
        }
    });

    function onSubmit() {
        navigation.navigate('Home');
    }

    return <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
        <ScrollView>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <AuthForm style={styles.authForm} onSubmit={onSubmit} />
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView >;
}

export default AuthScreen