import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import GuestScreen from "../screens/GuestScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { getFocusedRouteNameFromRoute, ParamListBase } from "@react-navigation/core";
import PaymentScreen from "../screens/PaymentScreen";
import IconButton from "../components/IconButton";

export interface CheckoutStackParamList extends ParamListBase {
    BottomTabNavigator: undefined;
    Guest: undefined;
}

const CheckoutNavigator: FunctionComponent = () => {
    const Stack = createStackNavigator<CheckoutStackParamList>();

    return <Stack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{
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
        <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={({ route, navigation }) => ({
                headerShown: false
                // headerShown: getFocusedRouteNameFromRoute(route) !== 'AuthItems',
                // headerLeft: (headerProps: {
                    // tintColor?: string;
                // }) => <IconButton {...headerProps} icon="menu" onPress={() => navigation.toggleDrawer()} />
                // title: getFocusedRouteNameFromRoute(route)
            })} />
        <Stack.Screen name="Guest" component={GuestScreen} options={{
            title: 'Dados Pessoais'
        }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{
            title: 'Pagamento'
        }} />
    </Stack.Navigator>;
}

export default CheckoutNavigator