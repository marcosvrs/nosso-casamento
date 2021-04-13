import React, { FunctionComponent } from "react";
import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Text from "../components/Text";
import { useSelector } from "react-redux";
import CheckoutStackParamList from "../navigation/CheckoutStackParamList";
import { CartItem } from "../models/cartItem";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import { RootState } from "../store/store";

interface CartScreenProps extends StackScreenProps<CheckoutStackParamList, 'Cart'> {
}

const CartScreen: FunctionComponent<CartScreenProps> = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        headerContainer: {
            flex: 1,
            margin: 16,
            backgroundColor: Colors.background,
            alignItems: 'center'
        },
        header: {
            color: 'white'
        },
        emptyCart: {
            flex: 1,
            alignSelf: 'center',
            fontFamily: 'poppins-bold',
            fontSize: 32,
            marginTop: '50%'
        },
        listContainer: {
        },
        totalContainer: {
            alignItems: 'flex-end',
            padding: 8,
            margin: 8,
            borderTopColor: 'rgba(0,0,0,0.2)',
            borderTopWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.2)',
            borderBottomWidth: 1
        },
        total: {
            fontFamily: 'poppins-bold',
            fontSize: 24
        },
        checkoutButton: {
            width: '80%',
            alignSelf: 'center',
            marginBottom: 16,
            padding: 16
        }
    });

    const { checkoutItems, checkoutItemsLength } =
        useSelector<RootState, { checkoutItems: { [key: string]: CartItem | undefined }; checkoutItemsLength: number; }>(state =>
            ({ checkoutItems: state.checkout.checkoutItems, checkoutItemsLength: state.checkout.checkoutItemsLength }))

    function renderCartItem({ item }: ListRenderItemInfo<CartItem>) {
        return <CartListItem item={item} />;
    }
    const totalValue: number = Object.values(checkoutItems).reduce((acc, curr) => acc + curr.value, 0);
    if (checkoutItemsLength <= 0) {
        return <View style={styles.container}>
            <Text style={styles.emptyCart}>Nada por aqui! 🤷‍♂️</Text>
        </View>;
    }

    return <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.listContainer}
            data={Object.values(checkoutItems)}
            renderItem={renderCartItem}
        />
        <View style={styles.totalContainer}>
            <Text style={styles.total}>Total: {totalValue.toLocaleString(undefined, { style: 'currency', currency: 'BRL' })}</Text>
        </View>
        <Button style={styles.checkoutButton} onPress={() => { navigation.navigate('Guest') }}>Checkout</Button>
    </View>;
}

export default CartScreen