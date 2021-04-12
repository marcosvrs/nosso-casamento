import React, { Component } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ActivityIndicator, Linking, Platform, StatusBar, AsyncStorage } from "react-native";
import { enableScreens } from "react-native-screens";
import store from "./store/store";
import CheckoutNavigator from "./navigation/CheckoutNavigator";
import { Observer } from "./components/Observer";

export default class App extends Component {
  private PERSISTENCE_KEY = 'NAVIGATION_STATE';

  state = {
    fontsLoaded: false,
    isReady: __DEV__ ? false : true,
    initialState: undefined
  };

  private async loadFonts() {
    await Font.loadAsync({
      'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.useEffectAlternative();
  }

  // componentDidUpdate() {
  //   this.useEffectAlternative();
  // }

  componentWillUnmount() {
    this.useEffectAlternative();
  }

  private useEffectAlternative() {
    this.loadFonts();
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(this.PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            this.setState({ initialState: state });
          }
        }
      } finally {
        this.setState({ isReady: true });
      }
    };

    if (!this.state.isReady) {
      restoreState();
    }
  }

  render() {
    if (!this.state.fontsLoaded || !this.state.isReady) {
      return <ActivityIndicator />;
    }

    enableScreens();

    return <Provider store={store}>
      <StatusBar hidden={true} />
      <NavigationContainer
        initialState={this.state.initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(this.PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        <CheckoutNavigator />
      </NavigationContainer>
      {/* <Observer value={this.state.fontsLoaded} didUpdate={this.loadFonts.bind(this)} /> */}
    </Provider>;
  }
}
