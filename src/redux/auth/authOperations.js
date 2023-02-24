import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import uploadPhotoToServer from '../../helpers/uploadPhotoToServer';
import { authAction } from './authSlice';




const authRegister =
  ({ login, email, password,
    photo
  }) =>
    async (dispatch) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        const imageUrl = await uploadPhotoToServer(photo, 'avatar/img_');

        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: imageUrl,
        });

        const user = auth.currentUser;

        const payload = {
          userId: user?.uid,
          userName: user?.displayName,
          userAvatar: user.photoURL,
          userEmail: user?.email,
        };

        dispatch(authAction.updateUserProfile(payload));
      } catch (error) {
        console.log('error.code', error.code);
        console.log('error.message', error.message);
      }
    };

const authLogin =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        const payload = {
          userId: user?.uid,
          userName: user?.displayName,
          userAvatar: user?.photoURL,
          userEmail: user?.email,
        };

        dispatch(authAction.updateUserProfile(payload));
      } catch (error) {
        console.log('error.code', error.code);
        console.log('error.message', error.message);
      }
    };

const authLogout = () => async (dispatch) => {
  try {
    await signOut(auth);

    dispatch(authAction.authStateChange(false));
  } catch (error) {
    console.log('error.code', error.code);
    console.log('error.message', error.message);
  }
};

const authStateChangeUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user?.uid,
          userName: user?.displayName,
          userAvatar: user?.photoURL,
          userEmail: user?.email,
        };

        dispatch(authAction.updateUserProfile(payload));
        dispatch(authAction.authStateChange(true));
      } else {
        const payload = {
          userId: null,
          userName: null,
          userAvatar: null,
          userEmail: null,
        };

        dispatch(authAction.updateUserProfile(payload));
        dispatch(authAction.authStateChange(false));
      }
    });
  } catch (error) {
    console.log('error.code', error.code);
    console.log('error.message', error.message);
  }
};

const authOperations = {
  authRegister,
  authLogin,
  authLogout,
  authStateChangeUser,
};

export default authOperations;
