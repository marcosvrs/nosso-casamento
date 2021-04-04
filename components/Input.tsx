import React, { Component } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default class Input extends Component<TextInputProps> {
    private styles = StyleSheet.create({
        input: {
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            paddingBottom: 4
        }
    });

    render() {
        return <TextInput {...this.props} style={{ ...this.styles.input, ...(this.props.style || {}) }}></TextInput>
    }
}