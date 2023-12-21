"user client"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebaseClient from "../components/firebaseClient"

async function appAuth() {
  const auth = getAuth(firebaseClient)

  if (
    !process?.env?.NEXT_PUBLIC_FIREBASE_USR_EML ||
    !process?.env.NEXT_PUBLIC_FIREBASE_USR_PWD
  ) {
    return "Env or env an app specific env prop is not defined, cannot proceed"
  }

  if (auth.currentUser) {
    return auth.currentUser
  }

  try {

    const user = await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_FIREBASE_USR_EML,
      process.env.NEXT_PUBLIC_FIREBASE_USR_PWD)
    console.log("user", user)
    if (!user) {
      return "User is not defined"
    }

    return auth.currentUser
  }
  catch (error) {
    return error;
  }
}

export async function getAuthStatus() {
  try {
    const auth = await appAuth();
    return {
      auth,
      error: null
    }
  } catch (error) {
    console.log(error)
    return {
      auth: null,
      error: error
    }
  }
}
