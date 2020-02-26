import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';


const app = firebase.initializeApp({
    apiKey: "AIzaSyBYfOwyu_K-EWFKJISujZoGutkWheg3s-I",
    authDomain: "stage2-assesment.firebaseapp.com",
    databaseURL: "https://stage2-assesment.firebaseio.com",
    projectId: "stage2-assesment",
    storageBucket: "stage2-assesment.appspot.com",
    messagingSenderId: "742525091732",
    appId: "1:742525091732:web:58094b3ef98cb3f7cc1981",
    measurementId: "G-CHETW44PBV"
});

export default app;
