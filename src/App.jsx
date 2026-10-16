import React, { useContext, useState } from 'react'
import './App.css'
import UrlInput from './components/UrlInput'
import Costumize from './components/Costumize'
import QrPreview from './components/QrPreview'
import { Context } from './context'
function App() {
  const { color } = useContext(Context)
  const [url, setUrl] = useState("")
  const [consutmize, setCostumize] = useState(false)
  function handleUrlSubmit(e) {
    e.preventDefault()
    setCostumize(true)
  }
  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <div className='urlUpload border-5 h-screen w-[60%] p-20 border-blue-500'>
        <UrlInput handleUrlSubmit={handleUrlSubmit} url={url} setUrl={setUrl} />
        <Costumize isOpen={consutmize} />
      </div>
      <div className='qrPreview p-20 border-5 h-screen w-[40%] border-red-500'>
        <QrPreview url={url} qrColor={color} />
      </div>
    </div>

  )

}

export default App
