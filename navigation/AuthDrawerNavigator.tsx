import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParamListBase } from "@react-navigation/core";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps } from "@react-navigation/drawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import { RootState } from "../store/store";
import AuthScreen from "../screens/AuthScreen";
import { BottomTabParamList } from "./BottomTabNavigator";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import { logout } from "../store/actions/auth";

export interface AuthDrawerParamList extends ParamListBase {
    Home: undefined;
    Login: undefined
}

interface AuthDrawerNavigatorProps extends BottomTabScreenProps<BottomTabParamList, 'AuthHome' | 'AuthItems' | 'AuthCart'> {
    title?: string,
    homeScreen: FunctionComponent<DrawerScreenProps<AuthDrawerParamList, 'Home'>>
    headerShown?: boolean
}

const AuthDrawerNavigator: FunctionComponent<AuthDrawerNavigatorProps> = ({ title, homeScreen, headerShown }) => {
    const Drawer = createDrawerNavigator<AuthDrawerParamList>();

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector<RootState, {
        isAuthenticated: boolean;
    }>(state => ({ isAuthenticated: !!state.auth.user }));

    return <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: headerShown ?? true,
            headerStyle: {
                backgroundColor: Colors.background
            },
            headerTitleStyle: {
                fontFamily: 'poppins-bold',
                fontSize: 24,
                color: 'white'
            },
            headerTintColor: 'white'
        }}
        drawerContent={props =>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {isAuthenticated ? <DrawerItem label="Logout" onPress={() => {
                    dispatch(logout());
                    props.navigation.navigate('Home');
                }} /> : null}
            </DrawerContentScrollView>
        }>
        <Drawer.Screen name="Home" component={homeScreen} options={({ navigation }) => ({
            title,
            headerLeft: (headerProps: {
                tintColor?: string;
            }) => <IconButton {...headerProps} icon="menu" onPress={() => navigation.toggleDrawer()} />
        })} />
        {!isAuthenticated ? <Drawer.Screen name="Login" component={AuthScreen} options={{
            headerShown: true
        }} /> : null}
    </Drawer.Navigator>;
}

export default AuthDrawerNavigator