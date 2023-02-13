import React from "react";
import { View, Text, StyleSheet, Button, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import UserSvg from "../../assets/Images/svg/UserSvg";
import GridSvg from "../../assets/Images/svg/GridSvg";
import AddPostSvg from "../../assets/Images/svg/AddPostSvg";
import LogOutSvg from "../../assets/Images/svg/LogOutSvg";
import ArrowBackSvg from "../../assets/Images/svg/ArrowBackSvg";

const Main = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Main.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 83 : 63,
          borderTopColor: "#0000004d",
          borderTopWidth: 0.5,
          paddingHorizontal: 73,
        },
        tabBarActiveTintColor: "#E8E8E8",
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.4,
          marginLeft: Platform.OS === "android" && "50%",
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#0000004d",
          borderBottomWidth: 0.5,
        },
        headerTintColor: "#212121",
      }}
    >
      <Main.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Publications",

          headerRight: () => (
            <LogOutSvg
              onPress={() => alert("LogOut")}
              style={{ marginRight: 16 }}
            />
          ),

          tabBarIcon: () => {
            return <GridSvg />;
          },
          tabBarActiveTintColor: "#212121",
          tabBarShowLabel: false,
        }}
      />
      <Main.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Create Publications",
          headerLeft: () => (
            <ArrowBackSvg
              onPress={() => navigation.navigate("PostsScreen")}
              color="#000000"
              style={{ marginLeft: 16 }}
            />
          ),
          headerTitleStyle: {
            marginLeft: Platform.OS === "android" && "24%",
          },

          tabBarIcon: () => {
            return <AddPostSvg />;
          },
          tabBarActiveTintColor: "#212121",
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Main.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return <UserSvg />;
          },
          tabBarActiveTintColor: "#212121",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Main.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
