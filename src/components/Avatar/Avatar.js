import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import uploadPhotoToServer from '../../helpers/uploadPhotoToServer';
import AddAvatarSvg from '../SVG/AddAvatarSvg';
import RemoveAvatarSvg from '../SVG/RemoveAvatarSvg';

export default function Avatar({ avatarImg, setAvatarImg }) {
  const addImage = async () => {
    if (avatarImg) return setAvatarImg('');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUrl = await uploadPhotoToServer(result.assets[0].uri, 'userAvatar/avatar');
      setAvatarImg(photoUrl);
    }
  };

  return (
    <View style={styles.container}>
      {avatarImg && <Image style={styles.img} source={{uri: avatarImg}} />}
      <TouchableOpacity style={styles.btn} onPress={addImage}>
        {!avatarImg ? <AddAvatarSvg /> : <RemoveAvatarSvg />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  img: {

    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  btn: {
    position: 'absolute',
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
});