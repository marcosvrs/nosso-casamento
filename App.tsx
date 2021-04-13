import React, { FunctionComponent, ReactNode, Reducer, ReducerState, useEffect, useReducer } from "react";
import * as Font from "expo-font";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ActivityIndicator, Linking, Platform, StatusBar, AsyncStorage } from "react-native";
import { enableScreens } from "react-native-screens";
import store from "./store/store";
import CheckoutNavigator from "./navigation/CheckoutNavigator";

enum APP_ACTIONS {
  FONTS_ENABLED = 'FONTS_ENABLED',
  READY = 'READY',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE'
}

interface AppState {
  fontsLoaded: boolean;
  isReady: boolean;
  initialState: any;
}

type AppAction = { type: APP_ACTIONS.FONTS_ENABLED } | { type: APP_ACTIONS.READY } | { type: APP_ACTIONS.SET_INITIAL_STATE; initialState?: InitialState };

const App: FunctionComponent = () => {
  const PERSISTENCE_KEY = 'NAVIGATION_STATE';

  const [{ fontsLoaded, isReady, initialState }, dispatch] = useReducer<Reducer<AppState, AppAction>>((currentState: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case APP_ACTIONS.FONTS_ENABLED:
        return {
          ...currentState,
          fontsLoaded: true
        };
      case APP_ACTIONS.READY:
        return {
          ...currentState,
          isReady: true
        };
      case APP_ACTIONS.SET_INITIAL_STATE:
        return {
          ...currentState,
          initialState: action.initialState
        };
      default:
        return currentState;
    }
  }, {
    fontsLoaded: false,
    isReady: __DEV__ ? false : true,
    initialState: undefined
  });

  async function loadFonts() {
    await Font.loadAsync({
      'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
    });
    dispatch({ type: APP_ACTIONS.FONTS_ENABLED });
  }

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  async function restoreState() {
    try {
      const initialUrl = await Linking.getInitialURL();

      if (Platform.OS !== 'web' && initialUrl == null) {
        // Only restore state if there's no deep link and we're not on web
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;

        if (state !== undefined) {
          dispatch({ type: APP_ACTIONS.SET_INITIAL_STATE, initialState: state });
        }
      }
    } finally {
      dispatch({ type: APP_ACTIONS.READY });
    }
  }

  useEffect(() => {
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!fontsLoaded || !isReady) {
    return <ActivityIndicator />;
  }

  enableScreens();

  return <Provider store={store}>
    <StatusBar hidden={true} />
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <CheckoutNavigator />
    </NavigationContainer>
  </Provider>;
}

export default App
