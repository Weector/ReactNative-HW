/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import PostMarkup from '../../components/PostMarkup/PostMarkup';
import AddPostSvg from '../../components/SVG/AddPostSvg';
import GridSvg from '../../components/SVG/GridSvg';
import UserSvg from '../../components/SVG/UserSvg';
import { postsSelector } from '../../redux/posts/postSelectors';
import postsOperations from '../../redux/posts/postsOperation';
import { authSelectors } from '../../redux/auth/authSelectors';

export default function DefaultPostsScreen({ navigation }) {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector.getPosts);
  const user = useSelector(authSelectors.getUser);

  useEffect(() => {
    dispatch(postsOperations.getAllPosts());

  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar */}

      <View style={styles.userData}>
        <Image
          source={{ uri: user.userAvatar}}
          style={styles.avatar}
        />
        <View style={styles.data}>
          <Text style={styles.login}>{ user.userName}</Text>
          <Text style={styles.email}>{ user.userEmail}</Text>
        </View>
      </View>

      {/* PostMarkup */}

      <PostMarkup>{{ posts, navigation }}</PostMarkup>

      {/* TabBar */}

      <View style={styles.tabBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.gridLogo}
          onPress={() => navigation.navigate('Posts')}
        >
          <GridSvg />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.AddLogoContainer}
          onPress={() => navigation.navigate('CreatePosts')}
        >
          <AddPostSvg style={styles.addLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.userLogo}
          onPress={() => navigation.navigate('Profile')}
        >
          <UserSvg />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  userData: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    paddingBottom: 12,
    marginLeft: 16,
  },

  data: {
    marginLeft: 8,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  login: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
    color: '#212121',
  },
  email: {
    fontSize: 11,
    lineHeight: 14,
    color: '#212121',
    opacity: 0.8,
  },

  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderTopColor: '#0000004d',
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 3,
  },

  gridLogo: {
    marginRight: 42,
  },

  AddLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },

  userLogo: {
    marginLeft: 42,
  },
});
