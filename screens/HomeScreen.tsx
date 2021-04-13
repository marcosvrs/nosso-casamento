import React, { FunctionComponent, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ItemsStackParamList from "../navigation/ItemsStackParamList";
import Text from "../components/Text";

const HomeScreen: FunctionComponent<StackScreenProps<ItemsStackParamList, 'ItemList'>> = () => {
    const styles = StyleSheet.create({
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
    const [pulse, setPulse] = useState(new Animated.Value(0));
    const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

    Animated.loop(
        Animated.sequence([
            Animated.timing(pulse, {
                toValue: 100,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(pulse, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(pulse, {
                toValue: 100,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(pulse, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true
            })
        ])
    ).start();

    return <View style={styles.container}>
        <Text style={styles.text}>Nosso Casamento</Text>
        <AnimatedIcon style={{
            transform: [{
                scale: pulse.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 0.9]
                })
            }]
        }} name="heart" color="red" size={160} />
    </View>;
}

export default HomeScreen