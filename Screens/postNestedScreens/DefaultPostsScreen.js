import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AddPostSvg from "../../assets/Images/svg/AddPostSvg";
import GridSvg from "../../assets/Images/svg/GridSvg";
import UserSvg from "../../assets/Images/svg/UserSvg";
import PostMarkup from "../../components/PostMarkup";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const postData = route.params;

  useEffect(() => {
    if (!route.params) {
      return;
    }
    const sameItem = posts.find((item) => item.id === postData.id);

    !sameItem && setPosts((prevState) => [...prevState, postData]);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar */}

      <View style={styles.userData}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.avatar}
        />
        <View style={styles.data}>
          <Text style={styles.login}>User Name</Text>
          <Text style={styles.email}>useremil@mail.com</Text>
        </View>
      </View>

      {/* PostMarkup */}

      <PostMarkup>{{ posts, navigation }}</PostMarkup>

      {/* TabBar */}

      <View style={styles.tabBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.gridLogo}
          onPress={() => navigation.navigate("Posts")}
        >
          <GridSvg />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.AddLogoContainer}
          onPress={() => navigation.navigate("CreatePosts")}
        >
          <AddPostSvg style={styles.addLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.userLogo}
          onPress={() => navigation.navigate("Profile")}
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
    backgroundColor: "#FFFFFF",
  },

  userData: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
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
    fontWeight: "700",
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontSize: 11,
    lineHeight: 14,
    color: "#212121",
    opacity: 0.8,
  },

  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderTopColor: "#0000004d",
    borderTopWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 3,
  },

  gridLogo: {
    marginRight: 42,
  },

  AddLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },

  userLogo: {
    marginLeft: 42,
  },
});
