// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  authDomain: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  projectId: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  storageBucket: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  messagingSenderId: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  appId: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
  measurementId: 'INSERT YOUR VARIABLE IN THE QUOTATIONS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Initialize GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
