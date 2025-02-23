const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const auth = require('./routes/auth')
const patients = require('./routes/patients')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/auth', auth)
app.use('/patients', patients)


app.get('/', (req, res) => {
    res.send('Supabase + Express API Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
