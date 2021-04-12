import React, { Component } from "react";
import { PressableProps, StyleSheet, View } from "react-native";
import FormControl from "./FormControl";

interface GuestFormProps extends PressableProps {
    onSubmit?: () => void;
}

export default class GuestForm extends Component<GuestFormProps> {
    private styles = StyleSheet.create({
        container: {},
        input: {
            marginVertical: 16
        },
        inputMultiline: {
            flex: 1,
            margin: 16
        },
    });

    state = {
        inputValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
            vows: ''
        },
        inputValidities: {
            name: false,
            email: false,
            address: false,
            phone: false,
            vows: false
        },
        isFormValid: false
    }

    private textChangeHandler(inputId: string, inputText: string) {
        const newState = {
            ...this.state,
            inputValues: { ...this.state.inputValues, [inputId]: inputText },
            inputValidities: { ...this.state.inputValidities, [inputId]: inputText.trim().length > 0 }
        };
        newState.isFormValid = Object.values(this.state.inputValidities).every((value) => value);
        this.setState(newState);
    }

    render() {
        return <View style={{ ...this.styles.container, ...(this.props.style || {}) }}>
            <FormControl containerStyle={this.styles.input}
                label="Nome"
                error="Qual seu nome?"
                autoCapitalize="words"
                returnKeyType="next"
                onInputChange={this.textChangeHandler.bind(this, 'name')} />
            <FormControl style={this.styles.input}
                label="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onInputChange={this.textChangeHandler.bind(this, 'email')} />
            <FormControl style={this.styles.input}
                label="Endereço"
                returnKeyType="next"
                onInputChange={this.textChangeHandler.bind(this, 'address')} />
            <FormControl style={this.styles.input}
                label="Celular"
                keyboardType="phone-pad"
                returnKeyType="next"
                onInputChange={this.textChangeHandler.bind(this, 'phone')} />
            <FormControl style={this.styles.inputMultiline}
                label="Votos de casamento"
                multiline
                onInputChange={this.textChangeHandler.bind(this, 'vows')} />
        </View >;
    }
}