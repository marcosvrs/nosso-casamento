import React, { Component } from "react";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputFocusEventData, TextInputProps, View, ViewStyle } from "react-native";
import Input from "./Input";
import { Observer } from "./Observer";
import Text from "./Text";

interface FormControlProps extends TextInputProps {
    label: string;
    initialValue?: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    onInputChange?: (value: string) => void;
}

export default class FormControl extends Component<FormControlProps> {
    private styles = StyleSheet.create({
        container: {
            width: '100%'
        },
        label: {
            fontFamily: 'poppins-bold'
        },
        input: {
        }
    });

    state = {
        value: this.props.initialValue ?? '',
        isValid: false,
        touched: false
    }

    private textChangeHandler(text: string) {
        this.setState({ value: text, isValid: text.trim().length > 0 });
        if (this.props.onChangeText !== undefined) {
            this.props.onChangeText(text);
        }
    }

    private lostFocusHandler(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        this.setState({ touched: true });
        if (this.props.onBlur !== undefined) {
            this.props.onBlur(e);
        }
    }

    private onInputChange(text: string) {
        if (this.props.onInputChange !== undefined) {
            this.props.onInputChange(text);
        }
    }

    render() {
        return <View style={{ ...this.styles.container, ...(this.props.containerStyle || {}) }}>
            <Text style={this.styles.label}>{this.props.label}</Text>
            <Input
                {...this.props}
                style={{ ...this.styles.input, ...(this.props.style || {}) }}
                value={this.state.value}
                onChangeText={this.textChangeHandler.bind(this)}
                onBlur={this.lostFocusHandler.bind(this)}
            />
            {!this.state.isValid && <Text>{this.props.error}</Text>}
            <Observer value={this.state.value} didUpdate={this.onInputChange.bind(this)} />
        </View>;
    }
}