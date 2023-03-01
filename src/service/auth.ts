import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import firebaseClient from "../components/firebaseClient"

function appAuth() {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth(firebaseClient)

        if (
            !process?.env?.NEXT_PUBLIC_FIREBASE_USR_EML ||
            !process?.env.NEXT_PUBLIC_FIREBASE_USR_PWD
        ) {
            return reject("Env or env an app specific env prop is not defined, cannot proceed")
        }

        if (!auth.currentUser) {
            try {

                const user = await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_FIREBASE_USR_EML,
                    process.env.NEXT_PUBLIC_FIREBASE_USR_PWD)
            }
            catch (error) {
                reject(error)
            }
        }

        resolve(auth.currentUser)
    })
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
