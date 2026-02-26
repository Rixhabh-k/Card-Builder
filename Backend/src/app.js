const express = require('express')
const userModel = require('./models/user.model')
const cors = require('cors')
const path = require('path')

const app = express()


// middleware 
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

//create user api
app.post('/api/user',async (req,res)=>{
    const {username, role, email, contact} = req.body

    const user = await userModel.create({
        username, role, email, contact
    })

    res.status(200).json({
        message: "User created successfully",
        user
    })
})

//fetch user api
app.get('/api/user',async (req,res)=>{
    const user = await userModel.find()

    res.status(201).json({
        message: "Users fetched successfully",
        user
    })
})

//delete user api
app.delete('/api/user/:id',async (req,res)=>{
    const id = req.params.id
    const user = await userModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "User deleted successfully",
        user
    })
})


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app