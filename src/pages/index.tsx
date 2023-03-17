import { useCallback, useState } from 'react'
import Editor from '../components/editor'

import Head from 'next/head'

export default function Home() {
  const [doc, setDoc] = useState<string>('# Hello, World!\n')
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    <>
      <Head>
        <title>Code Buddy</title>
        <meta name="description" content="Online code collabration tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Editor initialDoc={doc} onChange={handleDocChange} />
      </main>
    </>
  )
}
