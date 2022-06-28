// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBsqZv0HWpsIEvB7S-hPUAMeKbrcQVwbmE",
  authDomain: "docs-clone-cc92c.firebaseapp.com",
  projectId: "docs-clone-cc92c",
  storageBucket: "docs-clone-cc92c.appspot.com",
  messagingSenderId: "334056497201",
  appId: "1:334056497201:web:9d116fda2b5291f35b3510"
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)


// rules_version = '2'
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false
//     }
//   }
// }
