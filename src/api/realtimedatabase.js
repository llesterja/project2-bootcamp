import {
  onChildAdded,
  set,
  ref,
  push,
  get,
  child,
  remove,
} from 'firebase/database';
import { realTimeDatabase } from '../../firebase';

const REALTIME_DATABASE_KEY = 'userprofile';
const userKey = 'users'


// * load all data
export const fetchData = (callback) => {
  const userlistRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
  onChildAdded(userlistRef, callback);
};

// * get specific data
export const getSpecificData = (userKey) => {
  const userlistRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
  get(child(userlistRef, `${userKey}`))
    .then((data) => {
      if (data.exists()) {
        return data.val();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// * delete data
export const deleteData = (userKey) => {
  const userlistRef = ref(
    realTimeDatabase,
    `${REALTIME_DATABASE_KEY}/${userKey}`
  );

  remove(userlistRef).then(() => {
    console.log(`${userKey} removed`);
  });
};

// * create new data
export const writeData = (data) => {
  const userlistRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
  const newUserRef = push(userlistRef);

  set(newUserRef, {
    name: data.name,
    description: data.description,
    url: data.url,
    date: new Date().toLocaleTimeString(),
  });
};

// * edit specific data
export const editData = (userKey, data) => {
  const userlistRef = ref(
    realTimeDatabase,
    `${REALTIME_DATABASE_KEY}/${userKey}`
  );
  set(userlistRef, {
    name: data.name,
    description: data.description,
  });
};