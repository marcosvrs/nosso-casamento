import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const Input = forwardRef<TextInput, TextInputProps>((props, ref) => {
    const styles = StyleSheet.create({
        input: {
            paddingHorizontal: 4,
            paddingVertical: 4,
            borderBottomColor: 'gray',
            borderBottomWidth: 1
        }
    });
    return <TextInput {...props} style={{ ...styles.input, ...(props.style || {}) }} ref={ref}></TextInput>
})

export default Input