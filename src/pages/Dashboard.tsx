import React from 'react'

const RoomList = () => {
    // Example data for room list
    const rooms = [
        {
            roomName: 'Living Room',
            users: ['User1', 'User2', 'User3'],
        },
        {
            roomName: 'Bedroom',
            users: ['User4', 'User5'],
        },
        {
            roomName: 'Kitchen',
            users: ['User6', 'User7', 'User8'],
        },
    ]

    return (
        <div style={styles.roomListContainer}>
            {rooms.map((room, index) => (
                <div key={index} style={styles.roomCard}>
                    <h3>{room.roomName}</h3>
                    <ul style={styles.userList}>
                        {room.users.map((user, userIndex) => (
                            <li key={userIndex}>{user}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
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
}

export default RoomList
