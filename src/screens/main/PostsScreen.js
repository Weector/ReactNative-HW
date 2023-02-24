import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultScreenPosts from '../postNestedScreens/DefaultPostsScreen';
import CommentsScreen from '../postNestedScreens/CommentsScreen';
import MapScreen from '../postNestedScreens/MapScreen';
import ArrowBackSvg from '../../components/SVG/ArrowBackSvg';
import LogOutSvg from '../../components/SVG/LogOutSvg';
import { auth } from '../../firebase/config';

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <NestedScreen.Navigator
      screenOptions={{
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
      <NestedScreen.Screen
        name="PostsScreen"
        component={DefaultScreenPosts}
        options={{
          title: 'Publications',

          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={logOut}
              style={{ marginRight: 16 }}
            >
              <LogOutSvg />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Comments',

          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PostsScreen')}
              // onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <ArrowBackSvg />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            marginLeft: Platform.OS === 'android' && '24%',
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PostsScreen')}

              style={{ marginLeft: 16 }}
            >
              <ArrowBackSvg />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            marginLeft: Platform.OS === 'android' && '24%',
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
