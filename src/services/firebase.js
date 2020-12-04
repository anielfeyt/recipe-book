import * as firebase from 'firebase';

let recipebookApi;

if (process.env.NODE_ENV !== 'production') {
    recipebookApi = process.env.REACT_APP_RECIPE_BOOK_API;
} else {
    recipebookApi = process.env.RECIPE_BOOK_API;
}

const firebaseConfig = {
    apiKey: recipebookApi,
    authDomain: "tome-recipes.firebaseapp.com",
    databaseURL: "https://tome-recipes.firebaseio.com",
    projectId: "tome-recipes",
    storageBucket: "tome-recipes.appspot.com",
    messagingSenderId: "594031750343",
    appId: "1:594031750343:web:e9d4b51fea85a288c0e2e2"
}

firebase.initializeApp(firebaseConfig);

export default firebase;