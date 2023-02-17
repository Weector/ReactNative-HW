import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import CommentLogoSvg from "../assets/Images/svg/CommentLogoSvg";
import LocationSvg from "../assets/Images/svg/LocationSvg";
import dimensionsWidth from "../helpers/dimensions";

export default function PostMarkup({ children }) {
  const screenWidth = dimensionsWidth();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={children.posts}
      renderItem={({ item }) => (
        <View style={styles.list}>
          <Image
            source={{
              uri: item.newPhoto,
            }}
            style={{ ...styles.picture, width: screenWidth }}
          />
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.statisticsThumb}>
            <TouchableOpacity
              style={styles.commentTouch}
              onPress={() => {
                children.navigation.navigate("Comments", {
                  image: item.newPhoto,
                });
              }}
            >
              <CommentLogoSvg />
              <Text style={styles.commentAmount}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.locationTouch}
              onPress={() => {
                children.navigation.navigate("Map", { item });
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
    resizeMode: "stretch",
    borderRadius: 8,
    marginLeft: 16,
  },
  name: {
    color: "#212121",
    fontWeight: "500",
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
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentAmount: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
    marginRight: 27,
  },

  locationTouch: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: -22,
  },
  locationName: {
    textDecorationLine: "underline",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
});
