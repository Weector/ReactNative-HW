import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  SubmitEvent,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";

import DeleteAvatar from "../../assets/Images/svg/DeleteAvatar";
import LocationSvg from "../../assets/Images/svg/LocationSvg";
import CommentLogoSvg from "../../assets/Images/svg/CommentLogoSvg";
import LikeSvg from "../../assets/Images/svg/LikeSvg";
import GridSvg from "../../assets/Images/svg/GridSvg";
import UserWhiteSvg from "../../assets/Images/svg/UserWhiteSvg";
import PlusSvg from "../../assets/Images/svg/PlusSvg";
import LogOutSvg from "../../assets/Images/svg/LogOutSvg";

const POSTS = [
  {
    id: "45k6-j54k-4jth",
    name: "Random picture 1",
    location: "Location 1",
  },
  {
    id: "4116-jfk5-43rh",
    name: "Random picture 2",
    location: "Location 2",
  },
  {
    id: "4d16-5tt5-4j55",
    name: "Random picture 3",
    location: "Location 3",
  },
  {
    id: "LG16-ant5-0J25",
    name: "Random picture 4",
    location: "Location 4",
  },
  {
    id: "Fr45-ant5-2WWq",
    name: "Random picture 5",
    location: "Location 5",
  },
];

export default function RegistrationScreen({ navigation }) {
  const [posts, setPosts] = useState(POSTS);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const width = Dimensions.get("window").width - 16 * 2;
    setDimensions(width);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/Images/registerBackground.jpg")}
      >
        <View style={styles.content}>
          <LogOutSvg
            style={styles.logoutLogo}
            onPress={() => alert("LogOut")}
          />
          <View style={styles.avatarBG}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
            <TouchableOpacity
              // onPress={formSubmit}
              activeOpacity={0.7}
              type={SubmitEvent}
            >
              <DeleteAvatar style={styles.addAvatar} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>User Name</Text>

          <SafeAreaView>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <Image
                    source={{
                      uri: "https://picsum.photos/343/240",
                    }}
                    style={{ ...styles.picture, dimensions }}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.statisticsThumb}>
                    <View style={styles.statisticsContainer}>
                      <CommentLogoSvg />
                      <Text style={styles.commentAmount}>0</Text>
                      <LikeSvg />
                      <Text style={styles.likeAmount}>0</Text>
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
          </SafeAreaView>
        </View>
        <View style={styles.tabBar}>
          <GridSvg
            style={styles.gridLogo}
            onPress={() => navigation.navigate("PostsScreen")}
          />
          <View style={styles.userLogoContainer}>
            <UserWhiteSvg style={styles.userLogo} />
          </View>

          <PlusSvg
            style={styles.plusLogo}
            onPress={() => navigation.navigate("CreatePostsScreen")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 295,
  },
  content: {
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 475,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutLogo: {
    position: "absolute",
    top: 24,
    right: 19,
  },
  avatar: { width: 120, height: 120, borderRadius: 16 },
  title: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    marginBottom: 17,
    fontWeight: "500",
    color: "#212121",
  },

  avatarBG: {
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    transform: [{ translateX: -44 }],
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 9,
    right: -18.5,
    width: 25,
    height: 25,
  },
  list: { marginBottom: 35 },
  picture: { height: 240, borderRadius: 8, marginBottom: 8 },
  name: {
    color: "#212121",
    fontWeight: "500",
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
  likeAmount: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  locationContainer: {
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
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "ios" ? 83 : 73,
    borderTopColor: "#0000004d",
    borderTopWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
  gridLogo: { marginRight: 42 },
  userLogoContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },

  plusLogo: { marginLeft: 42 },
});
