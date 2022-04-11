import { useState } from 'react'
import axios from "axios"

export default function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("file", file)
    formData.append("description", description)

    const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    console.log(result.data)
}

  return (
    <div className="App">
      <form onSubmit={submit}>
        Upload file here (only accepts .txt files): <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept=".txt"
        ></input>
        <br></br>
        Your name (to later be replaced with wallet address): 
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
    )
  }