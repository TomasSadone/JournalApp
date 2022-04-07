/**
 * @jest-environment node
 */
 import * as fs from 'fs';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUpLoading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types'
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id:'1yUzTCkOFzSjErC7SiDg',
            title:'Hola',
            body:'mundo'
        }
    }
};

let store = mockStore(initState);
const payload = {
    id: expect.any(String),
    title: '',
    body: '',
    date: expect.any(Number)
};
global.scrollTo = jest.fn(); 
describe('Pruebas con las acciones de notes', () => {

    beforeEach( ()=> store = mockStore(initState))

    test('debe crear una nueva note startNewNote', async () => {
        await store.dispatch(startNewNote()); 
        const actions = store.getActions();
        const noteId = actions[1].payload.id;
        expect(actions[0]).toEqual({
            type: '[Notes] Set active note',
            payload
        });
        expect(actions[1]).toEqual({
            type: '[Notes] New note',
            payload
        });
        deleteDoc( doc(db, `/testing/journal/notes/${noteId}`));
    });
    test('startLoadingNotes debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('testing'));
        const actions = store.getActions(); 

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });
    test('startSaveNote debe actualizar la nota', async () => {
        const note = {
            id: '1yUzTCkOFzSjErC7SiDg',
            title: 'title',
            body: 'body'
        };
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        const docRef = await getDoc(doc(db, `/testing/journal/notes/${note.id}`));
        expect(docRef.data().title).toBe(note.title);
    });
    test('startUploading debe de actualizar url del entry', async () => {
        fileUpload.mockReturnValue('https://hola-mundo.com')
        fs.writeFileSync('foto.jpg', '')
        const file = fs.readFileSync('foto.jpg')
        await store.dispatch(startUpLoading(file));
 
        const docRef = await getDoc(doc(db, `/testing/journal/notes/1yUzTCkOFzSjErC7SiDg`));
        expect(docRef.data().url).toBe('https://hola-mundo.com')
    })
});