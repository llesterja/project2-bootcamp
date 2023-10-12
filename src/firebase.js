// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Configure with .env file later
const firebaseConfig = {
  apiKey: 'AIzaSyDjt6rchObckdetDOvlV_u6wnetqV02sFM',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: '1:420861331074:web:b83d863d9d15639b2f969b',
  databaseURL:
    'https://flighttrackerproj2-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
