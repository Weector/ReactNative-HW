import { addDoc, collection, doc, getCountFromServer, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { postsAction } from './postsSlice';
import uploadPhotoToServer from '../../helpers/uploadPhotoToServer';

const getAllComments =
  (postId) =>
    async dispatch => {
      try {
        const docRef = doc(db, 'posts', postId);
        const allComments = await getDocs(collection(docRef, 'comments'));
        const comment = allComments?.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        dispatch(postsAction.updateComments(comment));
      } catch (error) {
        console.log('error.message', error.message);
      }
    };

const createComment = ({ postId, text, own, date }) => async (dispatch) => {
  try {
    const docRef = doc(db, 'posts', postId);
    await addDoc(collection(docRef, 'comments'), {
      text,
      own,
      date, 
    });
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (err) {
    console.log('Error adding document: ', err);
  }
};


const getAllPosts = () => async (dispatch) => {
  try {


    const posts = await getDocs(collection(db, 'posts'));

    const newPosts = posts.docs.map(async (doc) => {

      const snapshotComments = await getCountFromServer(
        collection(doc.ref, 'comments')
      );
      const countComments = snapshotComments.data().count;

      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, 'likes')
      );
      const countLikes = snapshotLikes.data().count;

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,

      };
    });

    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    console.log(error.message);
  }
};


const addPostToServer =
  ({ longitude, latitude, userId, userName, name, location, newPhoto }) =>
    async dispatch => {
  
      const photo = await uploadPhotoToServer(newPhoto, 'postImage/post_');

      try {
        await addDoc(collection(db, 'posts'), {
          name,
          location,
          longitude,
          latitude,
          photo,
          userId,
          userName,
        });

        dispatch(getAllPosts());
        dispatch(getOwnPosts());
      } catch (e) {
        console.log('Error adding document: ', e);
      }
    };

const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user.userId;

    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const posts = await getDocs(q);


    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, 'comments')
      );
      const countComments = snapshotComments.data().count;

      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, 'likes')
      );
      const countLikes = snapshotLikes.data().count;

      const q = query(
        collection(doc.ref, 'likes'),
        where('authorId', '==', userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    console.log(error.message);
  }
};

const postsOperations = {
  getAllComments,
  getAllPosts,
  addPostToServer,
  createComment,
  getOwnPosts

};

export default postsOperations;

