import { db } from './firebase.js';
import { doc, collection, getDoc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

export function createGame(game) {

    const ref = collection(db, 'juegos');

    return addDoc(ref, game)
        .then(docRef => docRef.id)
        .catch(err => {
            throw err;
        });

}

export async function getGames() {

    const games = [];
    const ref = collection(db, 'juegos');

    const snapshot = await getDocs(ref);
    snapshot.forEach(doc => {
        games.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return games;
}

export async function getGamesById(id) {

    const ref = doc(db, 'juegos', id);

    const game = await getDoc(ref);

    if (!game.exists()) {
        throw new Error('[videoGames.js getGamesById] No existe el juego con este id');
    }

    return {
        id: id,
        ...game.data()
    }
}

export async function editGameById(id, gameData) {

    const ref = doc(db, "juegos", id);

    try {
        await updateDoc(ref, gameData);
        console.log("[videoGames.js editGameById] Producto actualizado correctamente");
    } catch (error) {
        console.error("[videoGames.js editGameById] Error al actualizar el producto:", error);
    }

}

export async function deleteGameById(id) {
  const ref = doc(db, "juegos", id);

  try {
    await deleteDoc(ref);
    console.log("Juego eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el juego:", error);
  }
}
