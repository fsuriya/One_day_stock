import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAjM6i-WAhsm4GSJZGazSa4LqZ7e2nVqYg",
    authDomain: "one-day-stock.firebaseapp.com",
    databaseURL: "https://one-day-stock-default-rtdb.firebaseio.com",
    projectId: "one-day-stock",
    storageBucket: "one-day-stock.appspot.com",
    messagingSenderId: "967597579943"
};
firebase.initializeApp(config);

export default firebase;