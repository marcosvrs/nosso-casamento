import React, { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInputProps, View, ViewStyle, TextInput } from "react-native";
import { FormikProps } from "formik";
import Input from "./Input";
import Text from "./Text";

interface FormControlProps extends TextInputProps {
    label: string;
    form?: FormikProps<any>;
    id: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const FormControl = forwardRef<TextInput, FormControlProps>((props, ref) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%'
        },
        label: {
            fontFamily: 'poppins-bold'
        },
        labelError: {},
        input: {},
        inputError: {
            borderBottomColor: 'red',
        },
        error: {
            color: 'red'
        }
    });

    const hasError = props.form?.errors[props.id] && props.form?.touched[props.id];
    const labelError = hasError ? styles.labelError : {};
    const inputError = hasError ? styles.inputError : {};

    return <View style={{ ...styles.container, ...(props.containerStyle || {}) }}>
        <Text style={{ ...styles.label, ...labelError }}>{props.label}</Text>
        <Input
            onChangeText={props.form?.handleChange(props.id)}
            onBlur={props.form?.handleBlur(props.id)}
            value={props.form?.values[props.id]}
            {...props}
            style={{ ...styles.input, ...inputError, ...(props.style || {}) }}
            ref={ref} />
        {hasError && <Text style={styles.error}>{props.form?.errors[props.id]}</Text>}
    </View>;
})

export default FormControl