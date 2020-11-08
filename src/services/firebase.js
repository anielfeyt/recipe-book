import * as firebase from 'firebase';

// Add you own firebase config credentials here

const firebaseConfig = {
    apiKey: "AIzaSyAiWjJZJYDpgtwiX1Vc12dVTeOboaeuzEg",
    authDomain: "tome-recipes.firebaseapp.com",
    databaseURL: "https://tome-recipes.firebaseio.com",
    projectId: "tome-recipes",
    storageBucket: "tome-recipes.appspot.com",
    messagingSenderId: "594031750343",
    appId: "1:594031750343:web:e9d4b51fea85a288c0e2e2"
}

firebase.initializeApp(firebaseConfig);

export default firebase;