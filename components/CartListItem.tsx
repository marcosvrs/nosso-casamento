import React, { Component } from "react";
import { Animated, Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "../models/cartItem";
import Text from "./Text";
import { removeFromCart } from "../store/actions/checkout";

const connector = connect(undefined, { removeFromCart });

interface CartListItemProps extends ViewProps, ConnectedProps<typeof connector> {
    item: CartItem;
}

class CartListItem extends Component<CartListItemProps> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            margin: 8
        },
        itemContainer: {
            // flex: 1,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            width: '80%',
            alignSelf: 'center',
            overflow: 'hidden'
        },
        contentContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            padding: 8
        },
        image: {
            width: 100,
            height: 100,
            marginRight: 16
        },
        detailsContainer: {
            // flexDirection: 'row'
        },
        name: {
            fontFamily: 'poppins-bold'
        },
        price: {
            fontSize: 16
        },
        deleteContainer: {
            position: 'absolute',
            flex: 1,
            height: '100%',
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            padding: 16
        }
    });

    state = {
        selected: false,
        x: new Animated.Value(100),
        backgroundColor: new Animated.Value(0),
    }

    private select() {
        this.setState({ selected: !this.state.selected });
        const slideToValue = this.state.selected ? 100 : 0;
        const backgroundColorToValue = this.state.selected ? 0 : 100;

        Animated.spring(this.state.x, {
            toValue: slideToValue,
            useNativeDriver: true
        }).start();

        this.setState({ backgroundColor: new Animated.Value(0) }, () => {
            Animated.timing(this.state.backgroundColor, {
                toValue: backgroundColorToValue,
                duration: 300,
                useNativeDriver: false
            }).start();
        });
    }

    private removeFromCart() {
        this.props.removeFromCart(this.props.item.id);
    }

    render() {
        return <View style={this.styles.container}>
            <Pressable style={{ width: '100%' }} onPress={this.select.bind(this)}>
                <Animated.View style={{
                    ...this.styles.itemContainer, ...{
                        backgroundColor: this.state.backgroundColor.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']
                        })
                    }
                }}>
                    <View style={this.styles.contentContainer}>
                        <Image style={this.styles.image} source={this.props.item.image} />
                        <View style={this.styles.detailsContainer}>
                            <Text style={this.styles.name}>{this.props.item.name}</Text>
                            <Text style={this.styles.price}>{this.props.item.getValueCurrency()}</Text>
                        </View>
                    </View>
                    <Animated.View style={{
                        ...this.styles.deleteContainer, ...{
                            transform: [{
                                translateX: this.state.x
                            }]
                        }
                    }}>
                        <Pressable style={{ width: '100%' }} onPress={this.removeFromCart.bind(this)}>
                            <Ionicons name="trash-outline" color="rgba(0,0,0,0.1)" size={40} />
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </Pressable>
        </View>;
    }
}

export default connector(CartListItem)