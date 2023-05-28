import {auth} from "./firebase.js";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {createUser} from "./user.js";

let user = {
    id: null,
    email: null,
};

onAuthStateChanged(auth, newUserData => {
    
    if(newUserData) {
        // Usuario autenticado.
        user = {
            id: newUserData.uid,
            email: newUserData.email,
        }
    } else {
        // Usuario NO autenticado.
        user = {
            id: null,
            email: null,
        }
    }

    notifyAll();
});

let observers = [];

export function subscribeToAuthChanges(observer) {
    observers.push(observer);

    // A cada observer que se registra le pasamos la data actual del estado de autenticación.
    notify(observer);

    return () => observers = observers.filter(obs => obs !== observer);

}

function notify(observer) {
    observer({...user});
}

function notifyAll() {
    // console.log("Notificando a los observers... ", observers);
    observers.forEach(obs => notify(obs));
}

export function register({email, password}) {

    return createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {

            const user = credentials.user;

            return createUser(user.uid, {email: user.email})
                .then(() => {
        
                    return {
                        id: user.uid,
                        email: user.email,
                        rol: 0,
                    };

                })
        })
        .catch(err => {
            console.error("[auth.js register()] Error al crear la cuenta: ", err);
            throw err;
        });
}

export function login({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            const user = credentials.user;
            return {
                id: user.uid,
                email: user.email,
            };
        })
        .catch(err => {
            console.error("[auth.js login()] Error al iniciar sesión: ", err);
            throw err;
        })
}

export function logout() {
    return signOut(auth);
}
