import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/Button";
import Input from "../components/Input";
import RootStackParamList from "../navigators/RootStackParamList";

export default class NewItemScreen extends Component<StackScreenProps<RootStackParamList, 'Home'>> {
    private styles = StyleSheet.create({
        container: {
            paddingHorizontal: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%'
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            marginBottom: 8
        },
        input: {
            width: '40%'
        },
        addButton: {
            width: '40%',
            backgroundColor: 'green'
        },
        cancelButton: {
            width: '40%',
            backgroundColor: 'red'
        }
    });

    state = {
        enteredItemName: '',
        enteredItemValue: ''
    };

    private itemNameInputHandler(enteredText: string) {
        this.setState({ enteredItemName: enteredText });
    }

    private itemValueInputHandler(enteredValue: string) {
        this.setState({ enteredItemValue: enteredValue.replace(/[^0-9]/g, '') });
    }

    private addItemHandler() {
        if (!this.validateHandlers()) {
            return;
        }
        // this.props.onAddItem(this.state.enteredItemName, this.state.enteredItemValue);
        this.resetItemNameInputHandler();
        this.resetItemValueInputHandler();
        this.props.navigation.goBack();
    }

    private validateHandlers(): boolean {
        const currentValue = parseInt(this.state.enteredItemValue);
        if (isNaN(currentValue) || currentValue <= 0) {
            Alert.alert(
                'Invalid Value',
                'Value has to be an number bigger than 0',
                [{ text: 'Ok', style: 'destructive', onPress: this.resetItemValueInputHandler.bind(this) }]
            );
            return false;
        }
        if (this.state.enteredItemName === '') {
            Alert.alert(
                'Invalid Value',
                'Name is required',
                [{ text: 'Ok', style: 'destructive', onPress: this.resetItemNameInputHandler.bind(this) }]
            );
            return false;
        }
        return true;
    }

    private resetItemValueInputHandler() {
        this.setState({
            enteredItemValue: ''
        });
    }

    private resetItemNameInputHandler() {
        this.setState({
            enteredItemName: ''
        });
    }

    render() {
        /* <KeyboardAvoidingView behavior="position"> */
        /* </KeyboardAvoidingView> */

        return <View style={this.styles.container}>
            <View style={this.styles.inputContainer}>
                <Input
                    blurOnSubmit
                    style={this.styles.input}
                    placeholder="Item Name"
                    onChangeText={this.itemNameInputHandler.bind(this)}
                    value={this.state.enteredItemName} />
                <Input
                    blurOnSubmit
                    keyboardType="numeric"
                    style={this.styles.input}
                    placeholder="Item Value"
                    onChangeText={this.itemValueInputHandler.bind(this)}
                    value={this.state.enteredItemValue} />
            </View>
            <View style={this.styles.buttonContainer}>
                <Button style={this.styles.cancelButton} onPress={this.props.navigation.goBack.bind(this)}>CANCEL</Button>
                <Button style={this.styles.addButton} onPress={this.addItemHandler.bind(this)}>ADD</Button>
            </View>
        </View>;
    }
}