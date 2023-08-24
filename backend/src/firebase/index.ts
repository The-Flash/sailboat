import firebase from "firebase-admin";

const serviceAccount = require("./key.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

export const db = firebase.firestore();