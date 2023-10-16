import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';
import useCurrentUser from '../../utils/useCurrentUser';
  


const SaveHomeToDatabase = async (currentUser,homeCountry) => {
  
  try {
    const db = getDatabase();
    const destinationRef = ref(db, `users/${currentUser.uid}/homeCountry`);
    await set(destinationRef, homeCountry);
    console.log('Home Country saved to the database.');
  } catch (error) {
    console.error('Error saving home country:', error);
  }
};


export const register = async (email, password, homeCountry) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await SaveHomeToDatabase(user,homeCountry);
    return user;
  } catch (error) {
    console.log(
      `Error at registration:${Error(error.code)} ${Error(error.message)}`
    );
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(`Error at login:${Error(error.code)} ${Error(error.message)}`);
  }
};

export const logOut = async (auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`Error at signOut: ${error.code} ${error.message}`);
  }
};

export const reAuth = (callback) => {
  onAuthStateChanged(auth, callback);
};
