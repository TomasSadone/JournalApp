import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email,password) => {
    return (dispatch) => {
        dispatch(startLoading())
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) =>{
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading())
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error')
                dispatch(finishLoading())
            })
    };
};

export const startRegisterWithEmailPasswordName = (email, password,  name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        /*esto devuelve una promesa, que cuando tiene resultados, 
        da un user sin displayName, entonces hay que hacer esto:*/
            .then(async({user}) => {
                await user.updateProfile({displayName:name});
                dispatch(login(user.uid, user.displayName));    
            })
            //que devuelve otra promesa, por eso async await.
            .catch(e =>{
                console.log(e)
            })
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid,displayName) =>({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() )
        dispatch(noteLogout())
    }
}

export const logout = () => ({
    type:types.logout
})