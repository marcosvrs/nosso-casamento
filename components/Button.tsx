import React, { FunctionComponent, ReactNode } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import Text from "./Text";

interface ButtonProps extends TouchableOpacityProps {
    textStyle?: StyleProp<ViewStyle>,
    title?: string;
    children?: string | ReactNode;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const styles = StyleSheet.create({
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
    if (props.title !== undefined) {
        props.children = props.title;
    }
    return <TouchableOpacity {...props} style={{ ...styles.container, ...(props.style || {}) }}>
        <Text style={{ ...styles.buttonText, ...(props.textStyle || {}) }}>{props.children}</Text>
    </TouchableOpacity>;
}

export default Button