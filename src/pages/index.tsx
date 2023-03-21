import { useCallback, useEffect, useRef, useState } from 'react'
import Editor from '../components/editor'
import { io, Socket } from 'socket.io-client'

import Head from 'next/head'

let socket: Socket

export default function Home() {
  const [doc, setDoc] = useState<string>('# Hello, World!\n')
  const ref = useRef()

  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function socketInitializer() {
    fetch('/api/socket')
    socket = io()

    socket.on('receive-message', save)
  }

  const save = (data: string) => {
    setDoc(data)
  }

  const handleDocChange = (newDoc: string) => {
    if (socket) {
      socket.emit('send-message', newDoc)
    }
  }

  return (
    <>
      <Head>
        <title>Code Buddy</title>
        <meta name="description" content="Online code collabration tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-primary">
        <Editor initialDoc={doc} onChange={handleDocChange} />
      </main>
    </>
  )
}
