import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import CommentLogoSvg from '../SVG/CommentLogoSvg';
import LocationSvg from '../SVG/LocationSvg';
import DimensionsWidth from '../../helpers/dimensions';
import ActiveCommentSvg from '../SVG/ActiveCommentSvg';


export default function PostMarkup({ children }) {

  const screenWidth = DimensionsWidth();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={children.posts}
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
            <TouchableOpacity
              style={styles.commentTouch}
              onPress={() => {
                children.navigation.navigate('Comments', {
                  image: item.photo,
                  postId: item.id,
                });
              }}
            >
              {item.countComments ? <ActiveCommentSvg /> : <CommentLogoSvg />}
              <Text style={{...styles.commentAmount, color: item.countComments ? '#212121': '#BDBDBD'}}>{item.countComments}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.locationTouch}
              onPress={() => {
                children.navigation.navigate('Map', { item });
              }}
            >
              <LocationSvg />
              
              <Text style={styles.locationName}>{item.location}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
const styles = StyleSheet.create({
  picture: {
    height: 240,
    resizeMode: 'stretch',
    borderRadius: 8,
    marginLeft: 16,
  },
  name: {
    color: '#212121',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 11,
    marginLeft: 16,
  },
  statisticsThumb: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  commentTouch: {
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

  locationTouch: {
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
});
