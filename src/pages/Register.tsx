import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Register form submitted:', formData)
        // Add your registration logic here
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </label>
                <br />
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
                    Register
                </button>
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
