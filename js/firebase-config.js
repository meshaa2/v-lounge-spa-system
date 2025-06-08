// Firebase configuration
const firebaseConfig = {
    apiKey: "AlzaSyA6ohFHNG8yehfHuDGJg1EHW8mGGLjQflo",
    authDomain: "v-lounge-spa.firebaseapp.com",
    projectId: "v-lounge-spa",
    storageBucket: "v-lounge-spa.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
            console.log('The current browser does not support persistence.');
        }
    });

// Export Firebase services
export { auth, db }; 