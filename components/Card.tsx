import React, { Component } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export default class Card extends Component<ViewProps> {
    private styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: .3,
            shadowRadius: 4,
            elevation: 8,
            borderRadius: 5,
            padding: 16
        }
    });

    render() {
        return <View style={{ ...this.styles.container, ...(this.props.style || {}) }}>
            {this.props.children}
        </View>;
    }
}