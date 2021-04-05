import React, { Component } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import CheckoutNavigator from "./navigations/CheckoutNavigator";

export default class App extends Component {

  state = {
    fontsLoaded: false
  };

  private async loadFonts() {
    await Font.loadAsync({
      'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    enableScreens();

    return <Provider store={store}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <CheckoutNavigator />
      </NavigationContainer>
    </Provider>;
  }
}
