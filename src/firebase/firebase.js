const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
require('firebase/compat/storage');

const firebaseConfig = {
    apiKey: "AIzaSyBIy6XXzW_T9-Q3EvtP4sQ9KDHShzmZwCQ",
    authDomain: "botpress-firestore.firebaseapp.com",
    projectId: "botpress-firestore",
    storageBucket: "botpress-firestore.appspot.com",
    messagingSenderId: "14169208807",
    appId: "1:14169208807:web:4cbcfe0a57fa9878bd2f42",
    measurementId: "G-1W9PL8MMMJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
module.exports = app;