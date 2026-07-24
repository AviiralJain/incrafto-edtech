import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDfDdV8G_4mt0S3yuIngbU_9HV2J_oQAMQ",
  authDomain: "incrafto-23fd7.firebaseapp.com",
  projectId: "incrafto-23fd7",
  storageBucket: "incrafto-23fd7.firebasestorage.app",
  messagingSenderId: "18350448114",
  appId: "1:18350448114:web:fd625e5abf027d89fbdf6b"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()