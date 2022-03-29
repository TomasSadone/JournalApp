import { db } from "../firebase/firebase-config"
import { collection, getDocs } from "@firebase/firestore"



// export const loadNotes = async (uid) => {
//     const notesSnap = await db.collection(`${uid}/journal/notes`).get()
//     const notes = [];

//     console.log(notesSnap)

//     return notes
// }

export const loadNotes = async (uid) => {
 
    const notesSnap = await getDocs(collection(db, `${ uid }/journal/notes`));
    const notes = [];
 
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
      });
 
    console.log(notesSnap)

    return notes;
};