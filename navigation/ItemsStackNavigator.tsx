import React, { FunctionComponent } from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import ItemsStackParamList from "./ItemsStackParamList";
import IconButton from "../components/IconButton";
import ItemListScreen from "../screens/ItemListScreen";
import SetItemScreen from "../screens/SetItemScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

const ItemsStackNavigator: FunctionComponent<StackScreenProps<ItemsStackParamList, 'BottomTabNavigator'>> = ({ navigation }) => {
    const Stack = createStackNavigator<ItemsStackParamList>();

    return <Stack.Navigator
        initialRouteName="ItemList"
        screenOptions={{
            title: 'Lista de Presentes',
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
        <Stack.Screen name="ItemList" component={ItemListScreen} options={({ navigation }) => ({
            headerRight: (headerProps: {
                tintColor?: string;
            }) => <IconButton {...headerProps} icon="add-circle" onPress={() => navigation.navigate('SetItem')} />
        })} />
        <Stack.Screen name="SetItem" options={{
            title: 'New Item'
        }} component={SetItemScreen} />
        <Stack.Screen
            name="Item"
            component={ItemDetailScreen} options={({ navigation, route }) => ({
                headerRight: (headerProps: {
                    tintColor?: string;
                }) => <IconButton {...headerProps} icon="create" onPress={() => navigation.navigate('SetItem', { itemId: route.params?.itemId })} />
            })} />
    </Stack.Navigator>;
}

export default ItemsStackNavigator