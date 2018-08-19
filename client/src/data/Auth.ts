import * as firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch } from "redux";
import { userActions } from "../store/actions/";
import { IUser, IUserData } from "../interface";
import { initial_UserData } from "../store/initialState";

export const listenForAuthStateChange = (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
    handlerAuthStateChange(firebaseUser, dispatch);
  });
};

const handlerAuthStateChange = async (
  firebaseUser: firebase.User,
  dispatch: Dispatch
) => {
  if (firebaseUser) {
    const userId = firebaseUser.uid
    const userData: IUserData = {
      ...initial_UserData,
      email: firebaseUser.email as string,
      displayName: firebaseUser.displayName as string,
      photoUrl: firebaseUser.photoURL as string,
    }
    const user: IUser = {
      [userId]: userData
    };

    dispatch(userActions.userAuthenticatedAction(user));
    await dispatch(userActions.ensureUserAccount(userId, userData));
  } else {
    dispatch(userActions.userSignedOut());
  }
};

export const signInWithGoogle = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const signOut = async () => {
  return firebase.auth().signOut();
};
