import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAe3YwkOjo_Gvlu-qdn6jZCMPsMbAsbOpA",
    authDomain: "aubier-coderhousereact.firebaseapp.com",
    projectId: "aubier-coderhousereact",
    storageBucket: "aubier-coderhousereact.appspot.com",
    messagingSenderId: "83442531350",
    appId: "1:83442531350:web:fda13cdcb0ba93e4ad4937"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

/*If you want to start measuring performance in your app, pass a function
to log results (for example: reportWebVitals(console.log)) 
or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
reportWebVitals();
