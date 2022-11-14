const { json } = require('express')
const User = require('../models/User')

//Require bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')


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
    //Defined the unique values we use to validate a user
    let {username, password} = req.body; 
    console.log(username);

    try {
    //search for the user in the database
        let user = await User.findOne({username});
        console.log(user); 
    //if user is not there, then value is false and we can display a user message of "not found"
        if(!user){
            return res.json({message:"user not found"}).status(400);
        }
    //if the user exists in the database then we do password comparison 
        const isMatch = await bcrypt.compareSync(password, user.password)
        console.log(password); //ref to our plain text password
        console.log(user.password); //encrypted password

    //if the password is not a match then value is false and then we display a not found message 
        if(!isMatch){
            return res.json({message:"password not match"}).status(400);
        }
    //if password is a match we create a token 
        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: 36000000},
            (err, token) => {
                if(err) throw err
                res.json({token}).status(200);
            }
        )

    } catch (error) {
        console.log(error)
        res.json({message:"You are not logged in, try again later"}).status(400);
    }
}


async function user_details_get(req,res) {
    try {
        let findUser = await User.findById(req.params.userId)
        res.json(findUser)
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
    user_delete
}