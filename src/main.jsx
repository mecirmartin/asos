import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

import App from './App'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Editor from './pages/Editor'
import Register from './pages/Register'

const firebaseConfig = {
    apiKey: 'AIzaSyDxMrFIQjWpaWF-hDJ7vdA-ER6AvknTv8I',
    authDomain: 'asos2023.firebaseapp.com',
    projectId: 'asos2023',
    storageBucket: 'asos2023.appspot.com',
    messagingSenderId: '592967043854',
    appId: '1:592967043854:web:2dd16e979627b5144fa55f',
}

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/editor',
        element: <Editor />,
    },
])

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
