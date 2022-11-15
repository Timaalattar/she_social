const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Creating our event Schema
const EventModel = new Schema ({
    EventName:{type:String, require: true},
    Date: {type:String, require: true},
    Time: {type:String, require: true},
    Locate: {type:String, require: true},
    Category: {type:String, require: true},
    Description: {type:String, require: true},

    //Associate the user model
    User: {type: Schema.Types.ObjectId ,
        ref: 'User'
    },
    Confirmed: [{type: Schema.Types.ObjectId ,
        ref: 'Confirmed'
    }]
    


}, {
    timestamps: true
})

//Storing our Schema as a model 
const Event = mongoose.model('Event', EventModel)


//Exporting our Model 
module.exports = Event