import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';
import uuid from 'react-native-uuid';

const uploadPhotoToServer = async (newPhoto, path) => {
  try {
    const res = await fetch(newPhoto);
    const file = await res.blob();
    const storageRef = ref(storage, `${path}${uuid.v4()}`);

    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.log('error', error.message);
  }
};

export default uploadPhotoToServer;