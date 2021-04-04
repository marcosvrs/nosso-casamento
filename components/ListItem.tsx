import React, { Component } from "react";
import { GestureResponderEvent, Image, StyleSheet, ViewProps, Pressable, Dimensions } from "react-native";
import Item from "../models/item";
import Card from "./Card";
import Text from "./Text";

interface ListItemProps extends ViewProps {
    item: Item;
    onPress(event: GestureResponderEvent): void;
}

export default class ListItem extends Component<ListItemProps> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            paddingBottom: 8,
            overflow: 'hidden'
        },
        touchContainer: {
            flex: 1,
            width: '100%',
        },
        image: {
            width: '100%',
            height: Dimensions.get('window').height / 5,
            marginBottom: 8
        },
        text: {
            textAlign: 'center'
        },
        name: {
            fontSize: 18
        },
        price: {
            fontFamily: 'poppins-bold',
        },
        buttonContainer: {
            width: '40%'
        }
    });

    render() {
        return <Card style={{ ...this.styles.container, ...(this.props.style || {}) }}>
            <Pressable style={this.styles.touchContainer} onPress={this.props.onPress}>
                <Image style={this.styles.image} source={this.props.item.image} />
                <Text style={{ ...this.styles.text, ...this.styles.name }}>{this.props.item.name}</Text>
                <Text style={{ ...this.styles.text, ...this.styles.price }}>R${this.props.item.value}</Text>
            </Pressable>
        </Card>;
    }
}