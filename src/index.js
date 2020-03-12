import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import firebase from 'firebase';

const aaa = firebase.initializeApp({
  apiKey: "AIzaSyA0OWFny_6qI6qEmHjAzfCG8fBXdh0Jzxo",
  authDomain: "test1-dbaa0.firebaseapp.com",
  databaseURL: "https://test1-dbaa0.firebaseio.com",
  projectId: "test1-dbaa0",
  storageBucket: "test1-dbaa0.appspot.com",
  messagingSenderId: "508381929934",
  appId: "1:508381929934:web:31c2f110dd93f213adcb9f"
});
const firestore = aaa.firestore();

ReactDOM.render(<App firestore={firestore}/>, document.getElementById('root'));

