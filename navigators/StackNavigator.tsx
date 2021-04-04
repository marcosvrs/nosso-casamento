import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import RootStackParamList from "./RootStackParamList";
import AddButton from "../components/AddButton";
import HomeScreen from "../screens/HomeScreen";
import NewItemScreen from "../screens/NewItemScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import { RouteProp } from "@react-navigation/core";

export default class StackNavigator extends Component {
    private Stack = createStackNavigator<RootStackParamList>();

    private getHomeScreenOptions(props: {
        route: RouteProp<RootStackParamList, 'Home'>;
        navigation: any;
    }) {
        return {
            headerRight: (headerProps: {
                tintColor?: string;
            }) => <AddButton {...headerProps} onPress={() => props.navigation.navigate('NewItem')} />
        }
    }

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
                },
                headerTintColor: 'white',
                headerBackTitleVisible: false
            }}>
            <this.Stack.Screen name="Home" component={HomeScreen} options={this.getHomeScreenOptions} />
            <this.Stack.Screen name="NewItem" options={{
                title: 'New Item'
            }} component={NewItemScreen} />
            <this.Stack.Screen
                name="Item"
                component={ItemDetailScreen}
                options={ItemDetailScreen.navigationOptions} />
        </this.Stack.Navigator>;
    }
}