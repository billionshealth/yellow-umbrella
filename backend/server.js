import express from 'express'

const app = express()

app.use(express.static('front'))




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
