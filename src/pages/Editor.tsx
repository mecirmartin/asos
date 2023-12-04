import React, { useEffect } from 'react'
import App from '../App.jsx'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../main.jsx'

const Editor = () => {
    const { roomName } = useParams()
    
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('logged_user')
        localStorage.removeItem('logged_user_name')
        navigate('/login')
    }

    const leave = () => {
        navigate('/dashboard')
    }


    useEffect(() => {
        let user = localStorage.getItem('logged_user')
        if (user == null) {
            navigate('/login')
        }else{
            getName(user)
        }
       
    }, [])

    const getName = async (uid) =>{
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("logged_user_name",docSnap.data().username)
          
          if(document.getElementById("logged_in_p") != null){
            document.getElementById("logged_in_p")!.innerHTML = "Logged in: "+docSnap.data().username
          }
        } 
    }


    return <>
    <div style={styles.body}>
        <nav style={styles.nav}>
        <p id="logged_in_p">Logged in: {localStorage.getItem("logged_user")}</p>
        <p >Currently in room: {roomName}</p>
        <button style={styles.formButton} onClick={leave}>Leave Room</button>
        <button style={styles.formButton} onClick={logout}>Logout</button>
        </nav> 
        <br />
        <br />
        <br />
        <App roomName={roomName} />
    </div>
    </>
}

const styles = {
    body: {
        display: "flex",
        flexDirection: "column",
    },
    nav: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        border: '0px 0px 0px 1px solid #ccc',
        alignItems: "center",
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    
    formButton: {
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
}

export default Editor
