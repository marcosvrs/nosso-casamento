import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewProps, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormControl from "./FormControl";
import { signIn } from "../store/actions/auth";

interface AuthFormProps extends ViewProps {
    onSubmit?: () => void;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ onSubmit, style }) => {
    const styles = StyleSheet.create({
        container: {
            marginVertical: 16
        },
        input: {
            marginHorizontal: 16,
            marginVertical: 8
        },
        signButton: {
            width: '80%',
            alignSelf: 'center',
            marginBottom: 16,
            padding: 16
        }
    });

    const dispatch = useDispatch();

    const passwordRef = React.createRef<TextInput>();

    function onFormSubmit(values: any) {
        dispatch(signIn(values.email, values.password));

        if (onSubmit !== undefined) {
            onSubmit();
        }
    }

    return <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().email('Insira um email correto.').required('Você esqueceu seu email?'),
            password: Yup.string().required('Não vamos ver sua senha!')
        })}
        onSubmit={onFormSubmit}>
        {(form) => (
            <View style={{ ...styles.container, ...(style || {}) }}>
                <FormControl containerStyle={styles.input}
                    id="email"
                    label="Email"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    form={form}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={passwordRef}
                    id="password"
                    label="Senha"
                    secureTextEntry={true}
                    textContentType="password"
                    autoCompleteType="password"
                    form={form}
                    onSubmitEditing={() => form.handleSubmit()} />
                <Button style={styles.signButton} onPress={form.handleSubmit}>Login</Button>
            </View>)}
    </Formik>;
}

export default AuthForm