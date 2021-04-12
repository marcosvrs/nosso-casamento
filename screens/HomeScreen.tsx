import React, { Component } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ItemsStackParamList from "../navigation/ItemsStackParamList";
import Text from "../components/Text";

export default class HomeScreen extends Component<StackScreenProps<ItemsStackParamList, 'ItemList'>> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 40
        }
    });

    private AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

    state = {
        pulse: new Animated.Value(0)
    }

    render() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.pulse, {
                    toValue: 100,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.pulse, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.pulse, {
                    toValue: 100,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.pulse, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();

        return <View style={this.styles.container}>
            <Text style={this.styles.text}>Nosso Casamento</Text>
            <this.AnimatedIcon style={{
                transform: [{
                    scale: this.state.pulse.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 0.9]
                    })
                }]
            }} name="heart" color="red" size={160} />
        </View>;
    }
}