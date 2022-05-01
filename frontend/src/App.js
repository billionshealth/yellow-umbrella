import { useState } from 'react'
import axios from "axios"
import './App.css'

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
      <div className="mainContainer">
        <div className="dataContainer">
            <div className="header">
                Yellow Umbrella ☂ 
            </div>

            <div className="text-block">
                Upload your DNA sequence to get a unique bio NFT
            </div>

            <div className="text-block">
                Select a .txt or .vcf file:
            </div>

            <div className="submit-block">
                <form onSubmit={submit}>
                    <input className="file-upload" filename={file} onChange={e => setFile(e.target.files[0])} 
                    type="file" accept=".txt"></input> 
                    {/* TODO: modify to accept other file types, such as VCF */}

                    {/* Your name: 
                    <input onChange={e => setDescription(e.target.value)} type="text"></input> */}
                    <button className="submitButton" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>

    )
  }