import React, { Component } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default class Input extends Component<TextInputProps> {
    private styles = StyleSheet.create({
        input: {
            paddingHorizontal: 4,
            paddingVertical: 4,
            borderBottomColor: 'gray',
            borderBottomWidth: 1
        }
    });

    render() {
        return <TextInput {...this.props} style={{ ...this.styles.input, ...(this.props.style || {}) }}></TextInput>
    }
}