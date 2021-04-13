import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import GuestScreen from "../screens/GuestScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import CheckoutStackParamList from "./CheckoutStackParamList";
import PaymentScreen from "../screens/PaymentScreen";

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
            options={({ route }) => ({
                headerShown: getFocusedRouteNameFromRoute(route) === 'Cart',
                title: 'Presentes Selecionados'
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