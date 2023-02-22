import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';

export async function guardar(pieza) {
	try {
		const docRef = await addDoc(collection(db, 'piezas'), { ...pieza });
		console.log('Document written with ID: ', docRef.id);
		return docRef.id;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export async function getAll() {
	const data = [];
	const all = await getDocs(collection(db, 'piezas'));
	all.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() });
	});
	return data;
}

export async function borrarPieza(id) {
	await deleteDoc(doc(db, 'piezas', id));
}

export async function editarPieza(pieza) {
	const docRef = doc(db, 'piezas', pieza.id);

	await updateDoc(docRef, { ...pieza.data });
}
