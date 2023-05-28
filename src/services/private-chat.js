import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp, query, where, limit, getDocs, getDoc, setDoc, onSnapshot, orderBy, doc } from "firebase/firestore";

const refCache = {};

export async function subscribeToPrivateChat(chatUser, callback) {

    const chatRef = await getPrivateChatReference(chatUser);

    const collectionRef = collection(db, 'private-chats', chatRef.id, 'messages');
    const q = query(
        collectionRef,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {

        const data = snapshot.docs.map(doc => {
            return {
                docId: doc.id,
                sender: doc.data().sender,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(data);
    });
}

export async function sendPrivateMessage({ sender, chatUser, message }) {

    const chatRef = await getPrivateChatReference(chatUser);


    const messageCollection = collection(db, 'private-chats', chatRef.id, 'messages');

    const response = await addDoc(messageCollection, {
        sender: sender,
        message,
        created_at: serverTimestamp(),
    });

    return {
        id: response.id,
    }
}

export async function getPrivateChatReference(chatUser) {

    const data = {
        id: chatUser.id,
        email: chatUser.email
    }

    const cachedRef = getFromCache(chatUser.id);
    if(cachedRef) return cachedRef;

    const chatCollection = collection(db, 'private-chats');
    const chatQuery = query(
        chatCollection,
        where('id', '==', chatUser.id),
        limit(1)
    );

    const querySnap = await getDocs(chatQuery);

    if (querySnap.empty) {
        const documentReference = await addDoc(chatCollection, data);
        addToCache(chatUser.id, documentReference);
        return documentReference;
    }

    addToCache(chatUser.id, querySnap.docs[0]);

    return querySnap.docs[0];
}

export async function getAllPrivateChats(callback) {

    const privateChatsCollection = collection(db, 'private-chats');

    const unsubscribe = onSnapshot(privateChatsCollection, (snapshot) => {

        const privateChats = snapshot.docs.map((doc) => ({

            id: doc.data().id,
            email: doc.data().email,

        }));

        callback(privateChats);

    });

    // Retornar la función de cancelación del suscriptor para detener la escucha
    return unsubscribe;
}

function addToCache(id, reference) {
    refCache[id] = reference;
}

function getFromCache(id) {
    return refCache[id] || null;
}

