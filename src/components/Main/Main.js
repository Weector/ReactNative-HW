import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import useRoute from '../../router/router';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';
import { authSelectors } from '../../redux/auth/authSelectors';

SplashScreen.preventAutoHideAsync();
SplashScreen.shown;

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.authStateChangeUser());
  }, [dispatch]);

  const state = useSelector(authSelectors.getIsAuth);

  const routing = useRoute(state);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );
  }
  return (
    <NavigationContainer>
      <View style={{ ...styles.container }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        {routing}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  loader: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
