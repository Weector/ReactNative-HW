import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';

import dimensionsWidth from '../../helpers/dimensions';
import SendSvg from '../../components/SVG/SendSvg';

import { useDispatch, useSelector } from 'react-redux';
import postsOperations from '../../redux/posts/postsOperation';
import { postsSelector } from '../../redux/posts/postSelectors';
import { authSelectors } from '../../redux/auth/authSelectors';

export default function CommentsScreen({ route }) {
  const initialState = {
    text: '',
    date: date,
    own: false,
  };

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const screenWidth = dimensionsWidth();

  const date = new Date().toLocaleString();
  const { postId, image } = route.params;

  const comments = useSelector(postsSelector.getComments);
  const {userAvatar, userId} = useSelector(authSelectors.getUser);

  useEffect(() => {

    dispatch(postsOperations.getAllComments(postId));
  }, [dispatch, postId]);


  const commentData = {
    text: state.text,
    ownerId: userId,
    date: date,
    postId: postId,
    ownerAvatar: userAvatar,
  };

  const sendComment = () => {
    dispatch(postsOperations.createComment(commentData));
    dispatch(postsOperations.getAllComments(postId));
    setState(initialState);
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  return (
    <View style={{ ...styles.container }}>
      <View>
        <Image
          source={{ uri: image }}
          style={{ ...styles.picture, width: screenWidth }}
        />
      </View>

      {/* Comments */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={comments}
        style={styles.list}
        renderItem={({ item }) => {
          const isOwn = item.ownerId === userId;
          return (
            <View
              style={
                !isOwn ? styles.commentContainer : styles.commentContainerOwn
              }
            >
              <View>
                <Image
                  source={{
                    uri: item.ownerAvatar,
                  }}
                  style={styles.avatar}
                />
              </View>
              <View
                style={!isOwn ? styles.textContainer : styles.textContainerOwn}
              >
                <Text style={styles.text}>{item.text}</Text>
                <Text style={{ ...styles.date, marginLeft: isOwn ? 'auto' : 0 }}>
                  {item.date}
                </Text>
              </View>
            </View>
          );}}
        keyExtractor={(item, index) => index}
      />

      {/* input & sendButton */}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View
          style={{
            ...styles.input,
            width: screenWidth,
            marginBottom: showKeyboard ? 110 : 0,
          }}
        >
          <TextInput
            value={state.text}
            placeholder={'Leave your comments...'}
            onFocus={() => {
              setShowKeyboard(true);
            }}
            onBlur={() => {
              setShowKeyboard(false);
            }}
            onChangeText={(value) => {
              setState((prevState) => ({
                ...prevState,
                text: value,
                own: false,
              }));
            }}
            onSubmitEditing={() => {
              sendComment();
            }}
          />
          <TouchableOpacity
            disabled={state.text ? false : true}
            activeOpacity={0.7}
            style={styles.btn}
            onPress={sendComment}
          >
            <SendSvg color={state.text ? '#FF6C00' : '#DADADA'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  picture: {
    height: 240,
    resizeMode: 'stretch',
    borderRadius: 8,
    marginBottom: 32,
  },

  input: {
    height: 50,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 100,
    paddingRight: 52,
    paddingLeft: 16,
    justifyContent: 'center',
    marginTop: 16,
  },
  btn: {
    position: 'absolute',
    top: 7,
    right: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentContainer: {
    flexDirection: 'row',
  },
  commentContainerOwn: {
    flexDirection: 'row-reverse',
  },
  textContainer: {
    minHeight: 69,
    width: 310,
    marginBottom: 24,
    backgroundColor: '#00000007',
    padding: 16,
    paddingRight: 32,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    marginLeft: 16,
  },
  textContainerOwn: {
    minHeight: 69,
    width: 310,
    marginBottom: 24,
    backgroundColor: '#00000007',
    padding: 16,
    paddingLeft: 32,
    borderRadius: 6,
    borderTopRightRadius: 0,
    marginRight: 16,
  },
  text: { color: '#212121', fontSize: 13, lineHeight: 18 },
  date: { color: '#BDBDBD', fontSize: 10, lineHeight: 12, marginTop: 8 },
});
