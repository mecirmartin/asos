import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
} from 'firebase/firestore'

import { db } from '../main'

const RoomList = () => {
    const [rooms, setRooms] = useState<any>([])
    const [formData, setFormData] = useState({
        roomName: '',
        password: '',
    })
    const navigate = useNavigate()

    const getRooms = async () => {
        const userId = localStorage.getItem('logged_user')
        const roomCollection = collection(db, 'room')
        const getRoomsQuery = query(roomCollection, where('users', 'array-contains', userId))
        const querySnapshot = await getDocs(getRoomsQuery)
        const rooms = querySnapshot.docs.map((doc) => doc.data())
        setRooms(rooms)
    }

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

    useEffect(() => {
        let user = localStorage.getItem('logged_user')
        if (user == null) {
            navigate('/login')
        }else{
            getName(user)
            getRooms()
        }
       
    }, [])

    const clearInputs = () =>
        setFormData({
            roomName: '',
            password: '',
        })

    const addRoom = async (event) => {
        event.preventDefault()
        const userId = localStorage.getItem('logged_user')
        await addDoc(collection(db, 'room'), {
            name: formData?.roomName,
            password: formData?.password,
            text: '',
            users: [userId],
        })
        getRooms()
        clearInputs()
    }

    const writeText = async (roomId: string) => {
        await updateDoc(doc(db, 'room', roomId), {
            text: 'NEW TEXT',
        })
        getRooms()
    }

    const joinRoom = async (event) => {
        event.preventDefault()
        const roomCollection = collection(db, 'room')
        const getRoomsQuery = query(
            roomCollection,
            where('name', '==', formData?.roomName),
            where('password', '==', formData?.password)
        )
        const querySnapshot = await getDocs(getRoomsQuery)
        const roomId = querySnapshot.docs?.[0]?.id
        if (roomId) {
            const userId = localStorage.getItem('logged_user')
            await updateDoc(doc(db, 'room', roomId), {
                users: arrayUnion(userId),
            })
            getRooms()
            clearInputs()
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const logout = () => {
        localStorage.removeItem('logged_user')
        localStorage.removeItem('logged_user_name')
        navigate('/login')
    }

    return (
        <>
            <nav style={styles.nav}>
            <p id="logged_in_p">Logged in: {localStorage.getItem("logged_user")}</p>
            <button style={styles.formButton} onClick={logout}>Logout</button>
            </nav>
            <div style={styles.roomListContainer}>
                {rooms.map((room, index) => (
                    <div key={index} style={styles.roomCard}>
                        <h3>{room.name}</h3>
                        <div>Number of users: {room.users.length}</div>
                    </div>
                ))}
            </div>
            <form style={styles.roomForm}>
                <label style={styles.formLabel}>Room Name:</label>
                <input
                    type="text"
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    style={styles.formInput}
                    required
                />
                <br />
                <label style={styles.formLabel}>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.formInput}
                    required
                />
                <br />
                <div style={styles.buttonContainer}>
                    <button style={styles.formButton} onClick={addRoom}>
                        Create Room
                    </button>
                    <button style={styles.formButton} onClick={joinRoom}>
                        Join Room
                    </button>
                </div>
            </form>
        </>
    )
}

const styles = {
    roomListContainer: {
        display: 'flex',
        flexDirection: 'column', // Stack cards vertically
        alignItems: 'center', // Center the cards horizontally
        width: '80%', // 80% of the viewport width
        margin: '120px', // Center the container
    },
    roomCard: {
        width: '100%', // Cards take the full width of the container
        marginBottom: '16px', // Add spacing between cards
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    userList: {
        listStyle: 'none',
        padding: 0,
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
    
    roomForm: {
        width: '300px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formLabel: {
        display: 'block',
        marginBottom: '10px',
    },
    formInput: {
        width: '94%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    formButton: {
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
    },
}

export default RoomList
