import React, { FunctionComponent } from "react";
import { Text as NativeText, StyleSheet, TextProps } from "react-native";

const Text: FunctionComponent<TextProps> = (props) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'poppins'
        }
    });
    return <NativeText {...props} style={{ ...styles.text, ...(props.style || {}) }}> {props.children}</NativeText >;
}

export default Text