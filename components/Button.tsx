import React, { Component, ReactNode } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
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
                padding: 8,
                borderRadius: 12,
                backgroundColor: Colors.primary
            },
            buttonText: {
                fontFamily: 'poppins-bold',
                textAlign: 'center',
                color: 'white'
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