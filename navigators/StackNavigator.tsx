import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../constants/Colors";
import RootStackParamList from "./RootStackParamList";
import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import NewItemScreen from "../screens/NewItemScreen";
import ItemScreen from "../screens/ItemScreen";

export default class StackNavigator extends Component {
    private Stack = createStackNavigator<RootStackParamList>();

    render() {
        return <this.Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                title: 'Nosso Casamento',
                headerStyle: {
                    backgroundColor: Colors.background
                },
                headerTitleStyle: {
                    fontFamily: 'poppins-bold',
                    fontSize: 24,
                    color: 'white'
                }
            }}>
            <this.Stack.Screen name="Home" component={HomeScreen} options={{
                headerRight: (props: {
                    tintColor?: string;
                }) => <Header {...props} />
            }} />
            <this.Stack.Screen name="NewItem" options={{
                title: 'New Item'
            }} component={NewItemScreen} />
            <this.Stack.Screen
                name="Item"
                component={ItemScreen}
                options={ItemScreen.navigationOptions} />
        </this.Stack.Navigator>;
    }
}