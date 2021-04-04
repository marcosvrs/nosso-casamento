import React, { Component } from "react";
import { Text as NativeText, StyleSheet, TextProps } from "react-native";

export default class Text extends Component<TextProps> {
    private styles = StyleSheet.create({
        text: {
            fontFamily: 'poppins'
        }
    });

    render() {
        return <NativeText {...this.props} style={{ ...this.styles.text, ...(this.props.style || {}) }}> {this.props.children}</NativeText >;
    }
};
