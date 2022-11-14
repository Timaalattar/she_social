const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Creating our user Schema
const UserModel = new Schema ({
    FirstName:{type:String, require: true},
    LastName: {type:String, require: true},
    username: {type:String, require: true},
    email: {type:String, require: true},
    password: {type:String, require: true},
   
    //Associate the user model
    Event: {type: Schema.Types.ObjectId ,
            ref: 'Event'
        }
        

}, {
    timestamps: true
})


//Storing our Schema as a model 
const User = mongoose.model('User', UserModel)


//Exporting our Model 
module.exports = User