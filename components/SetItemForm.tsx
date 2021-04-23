import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewProps, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormControl from "./FormControl";
import { setItem } from "../store/actions/items";
import { RootState } from "../store/store";
import Item from "../models/item";

interface SetItemFormProps extends ViewProps {
    itemId?: string;
    onSubmit?: () => void;
}

const SetItemForm: FunctionComponent<SetItemFormProps> = ({ itemId, onSubmit, style }) => {
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

    const { userToken, item } = useSelector<RootState, { userToken?: string; item?: Item; }>(state => ({ userToken: state.auth.user?.token, item: (itemId ? state.items.itemList[itemId] : undefined) }));
    const dispatch = useDispatch();

    const valueRef = React.createRef<TextInput>();
    const imageRef = React.createRef<TextInput>();
    const descriptionRef = React.createRef<TextInput>();

    function onFormSubmit(values: any) {
        if (userToken !== undefined) {
            dispatch(setItem(userToken, { id: item?.id, name: values.name, value: +values.value.replace(/,/, '.'), image: values.image, description: values.description }));
        }
        if (onSubmit !== undefined) {
            onSubmit();
        }
    }

    return <Formik
        initialValues={{
            name: item?.name,
            value: item?.value.toString(),
            image: item?.image,
            description: item?.description
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string().required('Insira um nome.'),
            value: Yup.number().required('Insira um valor.').transform((_, value) => {
                return +value.replace(/,/, '.');
            }).positive('Deve ser maior que 0.'),
            image: Yup.string().required('insira uma imagem.'),
            description: Yup.string()
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
                    onSubmitEditing={() => valueRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={valueRef}
                    id="value"
                    label="Valor"
                    form={form}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => imageRef.current?.focus()} />
                <FormControl containerStyle={styles.input}
                    ref={imageRef}
                    id="image"
                    label="Imagem"
                    form={form}
                    returnKeyType="next"
                    onSubmitEditing={() => descriptionRef.current?.focus()} />
                <FormControl containerStyle={styles.containerMultiline}
                    style={styles.inputMultiline}
                    ref={descriptionRef}
                    id="description"
                    label="Descrição"
                    form={form}
                    multiline />
                <Button style={styles.paymentButton} onPress={form.handleSubmit}>{item ? 'Editar' : 'Adicionar'}</Button>
            </View>)}
    </Formik>;
}

export default SetItemForm