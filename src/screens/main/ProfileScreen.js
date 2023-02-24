import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';

import LocationSvg from '../../components/SVG/LocationSvg';
import CommentLogoSvg from '../../components/SVG/CommentLogoSvg';
import LikeSvg from '../../components/SVG/LikeSvg';
import GridSvg from '../../components/SVG/GridSvg';
import UserWhiteSvg from '../../components/SVG/UserWhiteSvg';
import PlusSvg from '../../components/SVG/PlusSvg';
import LogOutSvg from '../../components/SVG/LogOutSvg';
import DimensionsWidth from '../../helpers/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import postsOperations from '../../redux/posts/postsOperation';
import { postsSelector } from '../../redux/posts/postSelectors';
import { auth } from '../../firebase/config';
import ActiveCommentSvg from '../../components/SVG/ActiveCommentSvg';
import { authSelectors } from '../../redux/auth/authSelectors';
import Avatar from '../../components/Avatar/Avatar';


export default function ProfileScreen({ navigation }) {
  const screenWidth = DimensionsWidth();

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  const posts = useSelector(postsSelector.getOwnPosts) .slice()
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    });



  const [avatarImg, setAvatarImg] = useState(user.userAvatar);

  useEffect(() => {
    dispatch(postsOperations.getOwnPosts());

  }, [dispatch]);
  
  

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../assets/Images/mainBackground.jpg')}
      >
        <View style={styles.content}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.logoutLogo}
            onPress={() => auth.signOut()}
          >
            <LogOutSvg />
            <View style={styles.avatarPosition}><Avatar avatarImg={avatarImg} setAvatarImg={setAvatarImg} /></View>
            
          </TouchableOpacity>
        
          <Text style={styles.title}>{user.userName }</Text>

          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <Image
                    source={{
                      uri: item.photo,
                    }}
                    style={{ ...styles.picture, width: screenWidth }}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.statisticsThumb}>
                    <View style={styles.statisticsContainer}>
                      {item.countComments ? <ActiveCommentSvg/> :  <CommentLogoSvg />}
                      <Text style={{...styles.commentAmount, color: item.countComments ? '#212121': '#BDBDBD'}}>{item.countComments }</Text>
                      <LikeSvg />
                      <Text style={styles.likeAmount}>{item.countLikes}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                      <LocationSvg />
                      <Text style={styles.locationName}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        {/* TabBar */}

        <View style={styles.tabBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gridLogo}
            onPress={() => navigation.navigate('Posts')}
          >
            <GridSvg />
          </TouchableOpacity>

          <View style={styles.userLogoContainer}>
            <UserWhiteSvg style={styles.userLogo} />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.plusLogo}
            onPress={() => navigation.navigate('CreatePosts')}
          >
            <PlusSvg />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
    paddingTop: 295,
  },
  content: {
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    minHeight: Platform.OS === 'iso' ? 475 : 525,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutLogo: {
    position: 'absolute',
    top: 24,
    right: 19,
  },
  avatar: { width: 120, height: 120, borderRadius: 16 },
  avatarPosition: {
    position: 'absolute',
    top: -85,
    right: 115,
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

  avatarBG: {
    position: 'absolute',
    top: -60,
    left: '50%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    transform: [{ translateX: -44 }],
    borderRadius: 16,
  },
  addAvatar: {
    position: 'absolute',
    bottom: 9,
    right: -18.5,
    width: 25,
    height: 25,
  },
  list: { marginBottom: 35 },
  picture: { height: 240, borderRadius: 8, marginBottom: 8 },
  name: {
    color: '#212121',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 11,
  },
  statisticsThumb: {
    flex: 1,
    marginLeft: 3,
  },
  statisticsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentAmount: {

    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
    marginRight: 27,
  },
  likeAmount: {
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: -22,
  },
  locationName: {
    textDecorationLine: 'underline',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 83,
    borderTopColor: '#0000004d',
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
  },
  gridLogo: { marginRight: 42 },
  userLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },

  plusLogo: { marginLeft: 42 },
});
