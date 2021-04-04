import React, { Component, ReactNode } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Text from "./Text";

interface ButtonProps extends TouchableOpacityProps {
    textStyle?: StyleProp<ViewStyle>,
    title?: string;
    children?: string | ReactNode;
}

export default class Button extends Component<ButtonProps> {
    private styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 4
        },
        buttonText: {
            fontSize: 12,
            textAlign: 'center'
        }
    });

    constructor(props: ButtonProps) {
        super(props);
        if (props.title !== undefined) {
            props.children = props.title;
        }
    }

    render() {
        return <TouchableOpacity {...this.props} style={{ ...this.styles.container, ...(this.props.style || {}) }}>
            <Text style={{ ...this.styles.buttonText, ...(this.props.textStyle || {}) }}>{this.props.children}</Text>
        </TouchableOpacity>;
    }
}