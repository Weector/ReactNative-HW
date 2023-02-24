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
  SubmitEvent,
} from 'react-native';
import Avatar from '../../components/Avatar/Avatar';
import { useDispatch } from 'react-redux';

import authOperations from '../../redux/auth/authOperations';

export default function RegistrationScreen({ navigation }) {
  const initialState = {
    login: '',
    email: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(false);
  const [inputFocus, setInputFocus] = useState('');
  const [avatarImg, setAvatarImg] = useState('');

  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const formSubmit = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authOperations.authRegister({ ...state, photo: avatarImg }));
    setState(initialState);
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
          <View
            style={{
              ...styles.form,
              marginBottom:
                Platform.OS === 'ios'
                  ? showKeyboard
                    ? 125
                    : 0
                  : showKeyboard
                    ? -174
                    : 0,
            }}
          >
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Avatar avatarImg={avatarImg} setAvatarImg={setAvatarImg} />
              </View>
            </View>
            <Text style={styles.title}>Registration</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <TextInput
                style={
                  inputFocus === 'login' ? styles.inputFocus : styles.input
                }
                value={state.login}
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                selectionColor={'#FF6C00'}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, login: value }));
                }}
                onFocus={() => {
                  setShowKeyboard(true);
                  setInputFocus('login');
                }}
                onBlur={() => {
                  setInputFocus('');
                }}
                onSubmitEditing={() => {
                  setShowKeyboard(false);
                  formSubmit();
                }}
              />
              <TextInput
                style={
                  inputFocus === 'email' ? styles.inputFocus : styles.input
                }
                value={state.email}
                placeholder="E-mail"
                placeholderTextColor="#BDBDBD"
                selectionColor={'#FF6C00'}
                keyboardType="email-address"
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
                onFocus={() => {
                  setShowKeyboard(true);
                  setInputFocus('email');
                }}
                onBlur={() => {
                  setInputFocus();
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
                  keyboardType="visible-password"
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
            </KeyboardAvoidingView>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={formSubmit}
              type={SubmitEvent}
            >
              <Text style={styles.btnTitle}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.signInLink}>
                Already have account?{' '}
                <Text onPress={() => navigation.navigate('Login')}>
                  Sign In
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 549,
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
  signInLink: {
    textAlign: 'center',
    color: '#1B4371',
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
  },

  avatarBG: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -44 }],
    borderRadius: 16,
  },
  addAvatar: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 14,
    right: 0,
    transform: [{ translateX: 12 }],
  },
  avatarWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
  },
});
