import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDPwbXpSSYDeptyCOnKAokUMp4SBiDKmyk",
    authDomain: "vue-tasks-15459.firebaseapp.com",
    databaseURL: "https://vue-tasks-15459.firebaseio.com",
    projectId: "vue-tasks-15459",
    storageBucket: "vue-tasks-15459.appspot.com",
    messagingSenderId: "1091298971095",
    appId: "1:1091298971095:web:28cd32e5a7effd42584f92",
    measurementId: "G-JM5W1X3SFL"
});

const firestore = firebaseApp.firestore();

export default firestore;
