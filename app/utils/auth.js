import { AsyncStorage, Platform } from "react-native";

export const ENV_URL =  "https://daug-app.herokuapp.com"

export const USER_KEY = "auth-user-key";
export const USER_ID = 'some-random-user-id';


export const onSignIn = (userId) => AsyncStorage.multiSet([[USER_KEY, "true"], [USER_ID, userId.toString()]])

export const onSignOut = () => AsyncStorage.multiRemove([USER_KEY, USER_ID]);

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};