import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBMjkO8J_rEuPC1i7XCSPqdQUl1c9OF2ZA",
  authDomain: "react-firebase-auth-78e73.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-78e73.firebaseio.com",
  projectId: "react-firebase-auth-78e73",
  storageBucket: "react-firebase-auth-78e73.appspot.com",
  messagingSenderId: "529407098894"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
    }
};

export default Firebase;