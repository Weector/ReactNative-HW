import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function RegistrationScreen() {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const formSubmit = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
    setState(initialState);
    console.log("state", state);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/Images/registerBackground.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, marginBottom: showKeyboard ? -300 : 0 }}
            >
              <Text style={styles.title}>Login</Text>
              <TextInput
                value={state.email}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
                placeholder="E-mail"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                onFocus={() => {
                  setShowKeyboard(true);
                }}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => {
                    setShowKeyboard(true);
                  }}
                />
                <Text style={styles.showPassword}>Show</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={formSubmit}
              >
                <Text style={styles.btnTitle}>Sign In</Text>
              </TouchableOpacity>
              <Text style={styles.signUnLink}>Don't have account? Sign Un</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    marginBottom: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderRadius: 8,
    minWidth: 343,
    height: 50,
    padding: 10,
    marginTop: 16,
    fontFamily: "Roboto-Regular",
  },
  passwordContainer: {
    position: "relative",
  },
  showPassword: {
    position: "absolute",
    top: 32,
    right: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  btn: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
  },
  btnTitle: { color: "#FFFFFF", fontSize: 16, lineHeight: 19 },
  signUnLink: {
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
