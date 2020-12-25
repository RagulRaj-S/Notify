import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCKJSvRur51yFgFBcM9sizAXpJv0WRsx58",
    authDomain: "react-notes-2f0b7.firebaseapp.com",
    databaseURL: "https://react-notes-2f0b7.firebaseio.com",
    projectId: "react-notes-2f0b7",
    storageBucket: "react-notes-2f0b7.appspot.com",
    messagingSenderId: "263676182994",
    appId: "1:263676182994:web:faa6cd251a7efef8d3480b",
    measurementId: "G-3BMTM6ZP3T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
