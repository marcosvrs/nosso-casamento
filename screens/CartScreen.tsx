import React, { Component } from "react";
import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Text from "../components/Text";
import { connect, ConnectedProps } from "react-redux";
import CheckoutStackParamList from "../navigation/CheckoutStackParamList";
import { CartItem } from "../models/cartItem";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import Colors from "../constants/Colors";

const connector = connect(
    (state) =>
        ({ checkoutItems: state.checkout.checkoutItems, checkoutItemsLength: state.checkout.checkoutItemsLength })
);

interface CartScreenProps extends StackScreenProps<CheckoutStackParamList, 'Cart'>, ConnectedProps<typeof connector> {
}

class CartScreen extends Component<CartScreenProps> {
    private styles = StyleSheet.create({
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

    private renderCartItem({ item }: ListRenderItemInfo<CartItem>) {
        return <CartListItem item={item} />;
    }

    render() {
        const totalValue: number = Object.values(this.props.checkoutItems).reduce((acc, curr) => acc + curr.value, 0);
        if (this.props.checkoutItemsLength <= 0) {
            return <View style={this.styles.container}>
                <Text style={this.styles.emptyCart}>Nada por aqui! 🤷‍♂️</Text>
            </View>;
        }

        return <View style={this.styles.container}>
            <FlatList
                contentContainerStyle={this.styles.listContainer}
                data={Object.values(this.props.checkoutItems)}
                renderItem={this.renderCartItem}
            />
            <View style={this.styles.totalContainer}>
                <Text style={this.styles.total}>Total: {totalValue.toLocaleString(undefined, { style: 'currency', currency: 'BRL' })}</Text>
            </View>
            <Button style={this.styles.checkoutButton} onPress={() => { this.props.navigation.navigate('Guest') }}>Checkout</Button>
        </View>;
    }
}

export default connector(CartScreen);