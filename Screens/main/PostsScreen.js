import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
} from "react-native";

const POSTS = [
  {
    id: "45k6-j54k-4jth",
    login: "HTML",
    email: "html@mail.com",
  },
  {
    id: "4116-jfk5-43rh",
    login: "JavaScript",
    email: "javascript@mail.com",
  },
  {
    id: "4d16-5tt5-4j55",
    login: "React",
    email: "react@mail.com",
  },
  {
    id: "LG16-ant5-0J25",
    login: "React Native",
    email: "reactnative@mail.com",
  },
  {
    id: "Fr45-ant5-2WWq",
    login: "Node Js",
    email: "nodejs@mail.com",
  },
];

export default function App() {
  const [posts, setPosts] = useState(POSTS);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
            <View style={styles.data}>
              <Text style={styles.login}>{item.login}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  list: {
    flex: 1,
    flexDirection: "row",
    marginTop: 32,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  data: { marginLeft: 8 },
  avatar: { width: 60, height: 60, borderRadius: 16 },
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
});
