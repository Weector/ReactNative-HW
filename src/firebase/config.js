import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAS9Sh10Wxp4FESCrDhONBK-MGKOK-IXyI',
  authDomain: 'reactnative-db-e16a0.firebaseapp.com',
  projectId: 'reactnative-db-e16a0',
  storageBucket: 'reactnative-db-e16a0.appspot.com',
  messagingSenderId: '610959935776',
  appId: '1:610959935776:web:b3bf6d320254e230b06f45',
  measurementId: 'G-426TXG8ETR',
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);

export const db = getFirestore(app);
