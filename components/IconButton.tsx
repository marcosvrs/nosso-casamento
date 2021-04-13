import React, { FunctionComponent } from "react";
import { GestureResponderEvent, Platform, StyleSheet } from "react-native";
import { StackHeaderTitleProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface IconButtonProps extends StackHeaderTitleProps {
    icon: string;
    size?: number;
    tintColor?: string;
    onPress(event: GestureResponderEvent): void;
}

const IconButton: FunctionComponent<IconButtonProps> = ({ icon, size, tintColor, onPress }) => {
    const styles = StyleSheet.create({
        button: {
            marginHorizontal: 16,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
    return <Button style={styles.button} onPress={onPress}>
        <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-${icon}`} color={tintColor ?? 'white'} size={size ?? 32} />
    </Button>;
}

export default IconButton