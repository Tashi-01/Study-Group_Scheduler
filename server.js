require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const studygroupRoutes = require('./routes/studygroups')
const dateRoutes = require('./routes/dates')
const chatRoutes = require('./routes/chatRoutes')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/studygroups', studygroupRoutes)
app.use('/api/dates', dateRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
        //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
})

    })
    .catch((error) => {
        console.log(error)
    })