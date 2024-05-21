import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';

export interface FirebaseConfigState {
    firebaseApp: FirebaseApp | null;
    firestoreDB: Firestore | null;
}

const initialState: FirebaseConfigState = {
    firebaseApp: null,
    firestoreDB: null,
};

const firebaseConfigSlice = createSlice({
    name: 'firebase-config',
    initialState,
    reducers: {
        updateFirebaseApp(state, action: { payload: FirebaseApp; type: any }) {
            return { ...state, firebaseApp: action.payload };
        },

        updateFirestoreDB(state, action: { payload: Firestore; type: any }) {
            return { ...state, firestoreDB: action.payload };
        },
    },
});

export const { updateFirebaseApp, updateFirestoreDB } =
    firebaseConfigSlice.actions;
export const { reducer: firebaseConfigReducer } = firebaseConfigSlice;
