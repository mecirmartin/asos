import React from 'react'
import App from '../App.jsx'
import { useParams } from 'react-router-dom'

const Editor = () => {
    const { roomName } = useParams()
    return <App roomName={roomName} />
}

export default Editor
