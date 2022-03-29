import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {firebase} from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { loadNotes } from '../helpers/loadNotes'

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged( (user) =>{
            if( user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                loadNotes(user.uid);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false)

        });
    },[dispatch, setChecking, setIsLoggedIn]) 

    if (checking) {
        return (<h1>Espere...</h1>)
    }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/auth/*" element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                    <AuthRouter/>
                </PublicRoute>
            } />
            <Route exact path="/" element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                    <JournalScreen/>
                </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
    </BrowserRouter>
)
}
