import {db} from './firebase.js';
import {setDoc, doc, getDoc} from "firebase/firestore";

export function createUser(id, {email}) {
    const userRef = doc(db, 'users', id);

    return setDoc(userRef, {
        email,
        rol: 0
    });
}

export async function getUserById(id) {
    const userRef = doc(db, 'users', id);

    const user = await getDoc(userRef);

    if(!user.exists()) {
        throw new Error('[users.js getUserById] No existe el usuario con este id');
    }

    return {
        id,
        email: user.data().email,
        rol: user.data().rol
    }
}
