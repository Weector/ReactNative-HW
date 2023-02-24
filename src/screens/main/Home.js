import React from 'react';
import {  Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import UserSvg from '../../components/SVG/UserSvg';
import AddPostSvg from '../../components/SVG/AddPostSvg';
import ArrowBackSvg from '../../components/SVG/ArrowBackSvg';

const Main = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Main.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          borderTopColor: '#0000004d',
          borderTopWidth: 0.5,
          paddingHorizontal: Platform.OS === 'ios' ? 69 : 51,
          paddingBottom: 30,
        },
        tabBarActiveTintColor: '#E8E8E8',
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.4,
          marginLeft: Platform.OS === 'android' && '50%',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#0000004d',
          borderBottomWidth: 0.5,
        },
        headerTintColor: '#212121',
      }}
    >
      <Main.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Main.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: 'Create Publications',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Posts')}
              style={{ marginLeft: 16 }}
            >
              <ArrowBackSvg />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            marginLeft: Platform.OS === 'android' && '24%',
          },

          tabBarIcon: () => {
            return <AddPostSvg />;
          },
          tabBarActiveTintColor: '#212121',
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Main.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return <UserSvg />;
          },
          tabBarActiveTintColor: '#212121',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Main.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
