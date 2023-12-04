import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth,  createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../main';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    useEffect(()=>{
        let user = localStorage.getItem("logged_user")
        if (user != null){
            navigate('/dashboard')
        }
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem("logged_user",user.uid)
            localStorage.setItem("logged_user_name",formData.username)

            setDoc(doc(db, "user", user.uid), {
                username: formData.username,
                email: formData.email
              });
            navigate('/dashboard')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
           
            if(errorCode == "auth/email-already-in-use"){
                alert("Email is already in use")
            }else if (errorCode == "auth/weak-password"){
                alert("Choose a stronger password")
            }else{
                alert("Unexpected error: "+errorCode)
            }
        });
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Username:
                </label>
                <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                <label style={styles.label}>
                    Email:
                </label>
                <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                <label style={styles.label}>
                    Password:
                </label>
                <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                <br />
                <button type="submit" style={styles.button}>
                    Register
                </button>
                <br />
                <button type="submit" style={styles.button} onClick={() => navigate('/login')}>
                    Login
                </button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        width: '300px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        margin: '10px 0',
    },
    input: {
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
}

export default RegisterForm
