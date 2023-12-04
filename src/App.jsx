import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import Editor from '@monaco-editor/react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import { WEBSOCKET_URL } from '/websocketConfig.js' // Adjust the path as needed


// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

function App({ roomName }) {
    const editorRef = useRef(null)

    // Editor value -> YJS Text value (A text value shared by multiple people)
    // One person deletes text -> Deletes from the overall shared text value
    // Handled by YJS

    // Initialize YJS, tell it to listen to our Monaco instance for changes.

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
        // Initialize YJS
        const doc = new Y.Doc() // a collection of shared objects -> Text
        // Connect to server (or start connection) with WebSocket
        const provider = new WebsocketProvider(WEBSOCKET_URL, roomName, doc)
        const type = doc.getText('monaco') // doc { "monaco": "what our IDE is showing" }
        // Bind YJS to Monaco
        const binding = new MonacoBinding(
            type,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness,
        )
        //// tu sa zobrazuju informacie o aktualnom dokumente, userIds
        // console.log(provider.awareness)
        //
        // // Listens for awareness changes from other clients
        // provider.awareness.on('change', changes => {
        //     // The new awareness state changes
        //     changes;
        //     // Complete map of awareness states, in the form of `clientId => JSON`
        //     provider.awareness.getStates();
        //     console.log(provider.awareness)
        // })
    }

    return <Editor height='100vh' width='98vw' theme='vs-dark' onMount={handleEditorDidMount} />
}

export default App
