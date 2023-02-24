import React, { useState } from 'react';
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
} from 'react-native';

import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';

export default function LoginScreen({ navigation }) {
  const initialState = {
    email: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(false);
  const [inputFocus, setInputFocus] = useState('');

  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const formSubmit = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
    dispatch(authOperations.authLogin({ ...state }));
    setState(initialState);
    // navigation.navigate("Home");
  };

  const showPassword = () => {
    setHidePass(!hidePass);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../../../assets/Images/mainBackground.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: showKeyboard ? -244 : 0,
              }}
            >
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={
                  inputFocus === 'email' ? styles.inputFocus : styles.input
                }
                value={state.email}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
                placeholder="E-mail"
                placeholderTextColor="#BDBDBD"
                selectionColor={'#FF6C00'}
                onFocus={() => {
                  setShowKeyboard(true);
                  setInputFocus('email');
                }}
                onBlur={() => {
                  setInputFocus('');
                }}
                onSubmitEditing={() => {
                  setShowKeyboard(false);
                  formSubmit();
                }}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={
                    inputFocus === 'password' ? styles.inputFocus : styles.input
                  }
                  value={state.password}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  selectionColor={'#FF6C00'}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                  onFocus={() => {
                    setShowKeyboard(true);
                    setInputFocus('password');
                  }}
                  onBlur={() => {
                    setInputFocus('');
                  }}
                  onSubmitEditing={() => {
                    setShowKeyboard(false);
                    formSubmit();
                  }}
                />
                {hidePass ? (
                  <Text style={styles.showPassword} onPress={showPassword}>
                    Hide
                  </Text>
                ) : (
                  <Text style={styles.showPassword} onPress={showPassword}>
                    Show
                  </Text>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={formSubmit}
              >
                <Text style={styles.btnTitle}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.signUnLink}>
                  Don't have account?
                  <Text onPress={() => navigation.navigate('Registration')}>
                    {' '}
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#E5E5E5',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    marginBottom: 17,
    fontWeight: '500',
    color: '#212121',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    color: '#212121',
    borderRadius: 8,
    minWidth: 343,
    height: 50,
    padding: 10,
    marginTop: 16,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#F6F6F6',
    color: '#212121',
    borderRadius: 8,
    minWidth: 343,
    height: 50,
    padding: 10,
    marginTop: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  showPassword: {
    position: 'absolute',
    top: 32,
    right: 16,
    color: '#1B4371',
  },
  btn: {
    marginTop: 43,
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: { color: '#FFFFFF', fontSize: 16, lineHeight: 19 },
  signUnLink: {
    textAlign: 'center',
    color: '#1B4371',
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
  },
});
