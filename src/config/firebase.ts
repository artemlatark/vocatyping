import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

import {ENV} from './config';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBCvVEbyR4x3_PJSuCBiOWAbbHD4uWJ-hM',
  authDomain: 'vocatyping-1.firebaseapp.com',
  projectId: 'vocatyping-1',
  storageBucket: 'vocatyping-1.appspot.com',
  messagingSenderId: '778945291244',
  appId: '1:778945291244:web:a2fc1500795519481556c9',
  measurementId: 'G-96ETBV23S2',
};

const app = initializeApp(FIREBASE_CONFIG);

export const firebaseAuth = getAuth(app);

export const firestoreDB = getFirestore(app);

export const firebaseStorage = getStorage(app);

export const firebaseAnalytics = ENV === 'production' ? getAnalytics(app) : null;
