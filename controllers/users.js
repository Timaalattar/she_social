const { json } = require('express')
const User = require('../models/User')

//Require bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function user_create_post(req,res) {
    try {
       
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        console.log(hashedPassword)
 
        const newUser= await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            username:req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        res.json(newUser)
    } catch (err) {
        res.json(err)
    }
}

async function user_login_post(req,res) {
    try {
    } catch (err) {
        res.json(err)
    }
}



async function user_details_get(req,res) {
    try {
    } catch (err) {
        res.json(err)
    }
}

async function user_update_put(req,res) {
    try {
        let UpdateUser = await User.findByIdAndUpdate(
            req.params.userId, req.body
            )
            // res.json({message: 'User update successfully'})
            res.json(UpdateUser)
    } catch (err) {
        res.json(err)
    }
}

async function user_delete(req,res) {
    try {
        let deleteuser = await User.findByIdAndDelete(req.params.userId)
        res.json({message: 'User delete successfully'})
        // res.json(deleteuser)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    user_create_post,
    user_login_post,
    user_details_get,
    user_update_put,
    user_delete,
}