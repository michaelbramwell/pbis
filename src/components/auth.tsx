"use client"

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import firebaseClient from './firebaseClient';

const auth = getAuth(firebaseClient);

const env = process?.env;

const login = () => {
    if(!env || !env?.FIREBASE_USR_EML || !env.FIREBASE_USR_PWD) {
        throw Error("Env or env an app specific env prop is not defined, cannot proceed");
    }

    signInWithEmailAndPassword(auth, env.FIREBASE_USR_EML, env.FIREBASE_USR_PWD);
};

export const AppAuth = () => {
  const [user, loading, error] = useIdToken(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};