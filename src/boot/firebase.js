import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

//console.log(firebaseConfig)

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebaseApp.auth()
const firebaseDB = firebaseApp.database()

export { firebaseAuth, firebaseDB }