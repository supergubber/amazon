// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBsjZskJ6HXzBT6rQKkZqnoFXmuN48LBAE',
  authDomain: 'fir-bb03d.firebaseapp.com',
  projectId: 'fir-bb03d',
  storageBucket: 'fir-bb03d.appspot.com',
  messagingSenderId: '200999343228',
  appId: '1:200999343228:web:a941e61e916c009369e5f9',
  measurementId: 'G-C1NYP6BCV6',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export default firebaseConfig
