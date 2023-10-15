import { doc, setDoc } from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { database } from '../../firebase';
import { storage } from '../../firebase';

export const saveDestinations = async (userId, destinations) => {
  const userRef = doc(database, 'users', userId);
  await setDoc(userRef, { destinations }, { merge: true });
};

export const uploadProfilePicture = async (userId, file) => {
  const storageRef = ref(storage, `profilePictures/${userId}`);
  await uploadBytes(storageRef, file);
};

export const getProfilePictureURL = async (userId) => {
  const storageRef = ref(storage, `profilePictures/${userId}`);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
