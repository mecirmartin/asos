import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [formData, setFormData] = useState({
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
        signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem("logged_user",user.uid)
            navigate('/dashboard')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </label>
                <br />
                <label style={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </label>
                <br />
                <button type="submit" style={styles.button}>
                    Login
                </button>
                <button type="submit" style={styles.button} onClick={() => navigate('/register')}>
                    Register
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
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
}

export default Login
