import React, { Component } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigators/BottomTabNavigator";
import { navigationRef } from "./navigators/RootNavigator";

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

    return <NavigationContainer ref={navigationRef}>
      <BottomTabNavigator />
    </NavigationContainer>;
  }
}
