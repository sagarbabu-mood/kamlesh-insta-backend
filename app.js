const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongoUrl} = require('./keys')
const cors = require('cors')
const PORT = process.env.port || 3005;

app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}))

const path = require('path')

require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/createPost'))
app.use(require('./routes/user'))
mongoose.connect(mongoUrl)
mongoose.connection.on("connected",()=> {
    console.log("mongo connected successfully")
})
mongoose.connection.on("error",()=> {
    console.log("error in coonnect")
})

app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname,"./frontend/build/index.html")
    ,function (err) {
        res.status(500).send(err)
    })
})

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})