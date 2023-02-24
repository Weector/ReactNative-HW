import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SubmitEvent,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';


import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import LocationSvg from '../../components/SVG/LocationSvg';
import TrashSvg from '../../components/SVG/TrashSvg';
import CameraSvg from '../../components/SVG/CameraSvg';
import DimensionsWidth from '../../helpers/dimensions';
import { authSelectors } from '../../redux/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import postsOperations from '../../redux/posts/postsOperation';

export default function CreatePostsScreen({ navigation }) {
  const initialState = {
    name: '',
    location: '',
  };

  const screenWidth = DimensionsWidth();

  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [newPhoto, setNewPhoto] = useState('');
  const [location, setLocation] = useState(null);

  const { userId, userName } = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setNewPhoto(photo.uri);
  };

  const longitude = location?.coords.longitude || 30.523333;
  const latitude = location?.coords.latitude || 50.450001;

  const sendPhoto = () => {
    const data = {
      name: state.name,
      location: state.location,
      longitude,
      latitude,
      userId,
      userName,
      newPhoto,
    };

    dispatch(postsOperations.addPostToServer(data));
    navigation.navigate('PostsScreen');

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onPress={keyboardHide}>
        <View>
          <View
            style={{
              ...styles.content,
              width: screenWidth,
            }}
          >
            <Camera
              style={{ ...styles.camera, width: screenWidth }}
              ref={setCameraRef}
            >
              {newPhoto && (
                <View style={styles.photo}>
                  <Image
                    style={{ ...styles.photoImage, width: screenWidth }}
                    source={{ uri: newPhoto }}
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={takePhoto}
                type={SubmitEvent}
              >
                <View style={styles.cameraLogoContainer}>
                  <CameraSvg style={styles.cameraLogo} />
                </View>
              </TouchableOpacity>
            </Camera>
          </View>
          {newPhoto ? (
            <Text style={styles.photoAction}>Edit Photo</Text>
          ) : (
            <Text style={styles.photoAction}>Load Photo</Text>
          )}
          <View>
            <TextInput
              style={styles.inputName}
              placeholder="Name..."
              value={state.name}
              onFocus={() => {
                setShowKeyboard(true);
              }}
              onChangeText={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  name: value,
                }));
              }}
              onSubmitEditing={(value) => {
                setShowKeyboard(false);
                newPhoto && sendPhoto();
                newPhoto &&
                  setState((prevState) => ({
                    ...prevState,
                    name: value,
                  }));
              }}
            />
          </View>
          <View style={styles.locationContainer}>
            <LocationSvg style={styles.positionLogo} />
            <TextInput
              style={styles.inputLocation}
              placeholder="Location..."
              value={state.location}
              onFocus={() => {
                setShowKeyboard(true);
              }}
              onChangeText={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  location: value,
                }));
              }}
              onSubmitEditing={(value) => {
                setShowKeyboard(false);
                newPhoto && sendPhoto();
                newPhoto &&
                  setState((prevState) => ({
                    ...prevState,
                    location: value,
                  }));
              }}
            />
          </View>
          {!showKeyboard && (
            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: newPhoto ? '#FF6C00' : '#F6F6F6',
              }}
              activeOpacity={0.7}
              type={SubmitEvent}
              disabled={newPhoto ? false : true}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.btnTitle,
                  color: newPhoto ? '#FFFFFF' : '#BDBDBD',
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {!showKeyboard && (
          <TouchableOpacity
            style={{
              ...styles.btnTrash,
              backgroundColor: newPhoto ? '#FF6C00' : '#F6F6F6',
            }}
            activeOpacity={0.7}
            type={SubmitEvent}
            disabled={newPhoto ? false : true}
            onPress={() => {
              setNewPhoto('');
            }}
          >
            <View>
              <TrashSvg color={newPhoto ? '#FFFFFF' : '#BDBDBD'} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 240,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    paddingBottom: 30,
    borderRadius: 8,

  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    marginTop: 30,
    borderRadius: 8,
  },
  cameraLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF4d',
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  photoImage: { height: 240, resizeMode: 'contain' },
  photoAction: {
    marginTop: 8,
    marginBottom: 48,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  inputName: {
    paddingBottom: 15,
    marginBottom: 32,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  locationContainer: { position: 'relative' },
  positionLogo: { position: 'absolute', top: -3, left: 1 },

  inputLocation: {
    paddingBottom: 15,
    marginBottom: 32,
    paddingLeft: 32,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  btn: {
    backgroundColor: '#F6F6F6',
    height: 51,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: { color: '#BDBDBD', fontSize: 16, lineHeight: 19 },
  btnTrash: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
