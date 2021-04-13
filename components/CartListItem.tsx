import React, { FunctionComponent, useEffect, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "../models/cartItem";
import Text from "./Text";
import { removeFromCart } from "../store/actions/checkout";

interface CartListItemProps extends ViewProps {
    item: CartItem;
}

const CartListItem: FunctionComponent<CartListItemProps> = ({ item }) => {
    const styles = StyleSheet.create({
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

    const dispatch = useDispatch();

    const [selected, setSelected] = useState(false);
    const [translateX] = useState(new Animated.Value(100));
    const [backgroundColor] = useState(new Animated.Value(0));

    function select() {
        setSelected((selected) => !selected);
    }

    useEffect(() => {
        const slideToValue = selected ? 0 : 100;
        const backgroundColorToValue = selected ? 100 : 0;

        Animated.spring(translateX, {
            toValue: slideToValue,
            useNativeDriver: true
        }).start();

        Animated.timing(backgroundColor, {
            toValue: backgroundColorToValue,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [selected])

    function triggerRemoveFromCart() {
        dispatch(removeFromCart(item.id));
    }

    return <View style={styles.container}>
        <Pressable style={{ width: '100%' }} onPress={select.bind(this)}>
            <Animated.View style={{
                ...styles.itemContainer, ...{
                    backgroundColor: backgroundColor.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']
                    })
                }
            }}>
                <View style={styles.contentContainer}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.getValueCurrency()}</Text>
                    </View>
                </View>
                <Animated.View style={{
                    ...styles.deleteContainer, ...{
                        transform: [{
                            translateX: translateX
                        }]
                    }
                }}>
                    <Pressable style={{ width: '100%' }} onPress={triggerRemoveFromCart}>
                        <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-trash-outline`} color="rgba(0,0,0,0.1)" size={40} />
                    </Pressable>
                </Animated.View>
            </Animated.View>
        </Pressable>
    </View>;
}

export default CartListItem