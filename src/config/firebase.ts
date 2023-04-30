import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBo4lHsXmrSAu4Y9hm0rgpGipwtkNX5cbE',
  authDomain: 'typerighting-5d448.firebaseapp.com',
  projectId: 'typerighting-5d448',
  storageBucket: 'typerighting-5d448.appspot.com',
  messagingSenderId: '196635186003',
  appId: '1:196635186003:web:cdefb0597dc46ab252c7a6',
  measurementId: 'G-96ETBV23S2',
};

const app = initializeApp(FIREBASE_CONFIG);

export const firebaseAuth = getAuth(app);

export const firestoreDB = getFirestore(app);

export const firebaseStorage = getStorage(app);

export const firebaseAnalytics = getAnalytics(app);
