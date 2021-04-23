import React, { FunctionComponent } from "react";
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import SetItemForm from "../components/SetItemForm";
import { ItemsStackParamList } from "../navigation/ItemsStackNavigator";

const SetItemScreen: FunctionComponent<StackScreenProps<ItemsStackParamList, 'SetItem'>> = ({ navigation, route }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'center'
        },
        form: {
            flex: 1,
            width: '100%'
        }
    });

    return <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
        <ScrollView>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <SetItemForm style={styles.form} itemId={route.params?.itemId} onSubmit={navigation.goBack} />
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>;
}

export default SetItemScreen