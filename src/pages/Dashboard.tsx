import React, { useEffect, useState } from 'react'
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'

import { db } from '../main'

const RoomList = () => {
    const [rooms, setRooms] = useState<any>([])
    const [formData, setFormData] = useState({
        roomName: '',
        password: '',
    })

    const getRooms = async () => {
        const userId = 'user2'
        const roomCollection = collection(db, 'room')
        const getRoomsQuery = query(roomCollection, where('users', 'array-contains', userId))
        const querySnapshot = await getDocs(getRoomsQuery)
        const rooms = querySnapshot.docs.map((doc) => doc.data())
        setRooms(rooms)
    }

    useEffect(() => {
        getRooms()
    }, [])

    const addRoom = async () => {
        await addDoc(collection(db, 'room'), {
            name: 'New room',
            password: 'password',
            text: '',
            users: ['user2'],
        })
        getRooms()
    }

    const writeText = async (roomId: string) => {
        await updateDoc(doc(db, 'room', roomId), {
            text: 'NEW TEXT',
        })
        getRooms()
    }

    const joinRoom = async (roomId: string) => {
        await updateDoc(doc(db, 'room', roomId), {
            users: arrayUnion('ULTRA_USER'),
        })
        getRooms()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <>
            <div style={styles.roomListContainer}>
                {rooms.map((room, index) => (
                    <div key={index} style={styles.roomCard}>
                        <h3>{room.name}</h3>
                        <ul style={styles.userList}>
                            {room.users.map((user, userIndex) => (
                                <li key={userIndex}>{user}</li>
                            ))}
                        </ul>
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
                    <button
                        style={styles.formButton}
                        onClick={() => joinRoom('8c4jJIK93QVqSV9U48zA')}
                    >
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
        margin: 'auto', // Center the container
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