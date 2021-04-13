import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewProps, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormControl from "./FormControl";
import { setGuest, setVows } from "../store/actions/checkout";
import { RootState } from "../store/store";

interface GuestFormProps extends ViewProps {
    onSubmit?: () => void;
}

const GuestForm: FunctionComponent<GuestFormProps> = ({ onSubmit, style }) => {
    const styles = StyleSheet.create({
        container: {
            marginVertical: 16
        },
        input: {
            marginHorizontal: 16,
            marginVertical: 8
        },
        containerMultiline: {
            flex: 1,
            margin: 16
        },
        inputMultiline: {
            flex: 1
        },
        paymentButton: {
            width: '80%',
            alignSelf: 'center',
            marginBottom: 16,
            padding: 16
        }
    });

    const { guest, vows } = useSelector<RootState, {
        guest: { name: string; email: string; address: string; phone: string; };
        vows: string;
    }>(state => ({ guest: state.checkout.guest, vows: state.checkout.vows }));
    const dispatch = useDispatch();

    const emailRef = React.createRef<TextInput>();
    const addressRef = React.createRef<TextInput>();
    const phoneRef = React.createRef<TextInput>();
    const vowsRef = React.createRef<TextInput>();

    function onFormSubmit(values: any) {
        dispatch(setGuest({ name: values.name, email: values.email, address: values.address, phone: values.phone }));
        dispatch(setVows(values.vows));

        if (onSubmit !== undefined) {
            onSubmit();
        }
    }

    return <Formik
        initialValues={{
            name: guest.name,
            email: guest.email,
            address: guest.address,
            phone: guest.phone,
            vows: vows
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string().required('Qual seu nome?'),
            email: Yup.string().email('Insira um email correto.').required('Você esqueceu seu email?'),
            address: Yup.string().required('Onde você mora?'),
            phone: Yup.string().required('Não vamos te ligar, pode colocar seu número celular!'),
            vows: Yup.string()
        })}
        onSubmit={onFormSubmit}>
        {(form) => (
            <View style={{ ...styles.container, ...(style || {}) }}>
                <FormControl containerStyle={styles.input}
                    id="name"
                    label="Nome"
                    form={form}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={emailRef}
                    id="email"
                    label="Email"
                    form={form}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => addressRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={addressRef}
                    id="address"
                    label="Endereço"
                    form={form}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={phoneRef}
                    id="phone"
                    label="Celular"
                    form={form}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => vowsRef.current?.focus()} />
                <FormControl containerStyle={styles.containerMultiline}
                    style={styles.inputMultiline}
                    ref={vowsRef}
                    id="vows"
                    label="Votos de casamento"
                    placeholder="Mande uma mensagem emocionante para o casal!"
                    form={form}
                    multiline />
                <Button style={styles.paymentButton} onPress={form.handleSubmit}>Pagar</Button>
            </View>)}
    </Formik>;
}

export default GuestForm