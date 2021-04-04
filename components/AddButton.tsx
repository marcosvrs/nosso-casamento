import React, { Component } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { StackHeaderTitleProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface AddButtonProps extends StackHeaderTitleProps {
    tintColor?: string;
    onPress(event: GestureResponderEvent): void;
}

export default class AddButton extends Component<AddButtonProps> {
    private styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        button: {
            marginHorizontal: 16,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });

    render() {
        return <Button style={this.styles.button} onPress={this.props.onPress}>
            <Ionicons name="add-circle" color={this.props.tintColor ?? 'white'} size={32} />
        </Button>;
    }
}