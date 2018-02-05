import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDz0z8GHGhh2JYHYKgl-4XYJShr1xhT3q8",
  authDomain: "projet-pfe-33b2b.firebaseapp.com",
  databaseURL: "https://projet-pfe-33b2b.firebaseio.com",
  projectId : "projet-pfe-33b2b",
  storageBucket: "projet-pfe-33b2b.appspot.com",
  messagingSenderId: "333415861328"
}

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;