const { json } = require('express')
const Event = require('../models/Event')
const User = require('../models/User')

async function event_details_get(req,res) {
    
    try {
const event = await Event.findById(req.params.eventId)
await event.populate('User')

res.json(event).status(200)

    } catch (err) {
        res.json(err)
    }
}

async function event_update_put(req,res) {
    try {
        let updatedEvent = await Event.findByIdAndUpdate(
            req.params.userId,
            req.params.eventsId,
            req.body 
        )
            res.status(200).json({message: 'Tweet updated Successfully!'})
        // res.json(updatedEvent)
    } catch (err) {
        res.json(err)
    }
}

async function event_delete(req,res) {
    try {
        await Event.findByIdAndDelete(
            req.params.eventId
        )
        res.json({message: 'Event Deleted Successfully'})
   
    } catch (err) {
        res.json(err)
    }
}

async function event_search_get(req,res) {
    
    try {
        let event = await Event.find({Category: req.params.category})
        res.json(event).status(200)

    } catch (err) {
        
        res.json(err)
    }
}

async function event_findall_get(req,res) {
    
    try {
        let event = await Event.find()
        res.json(event)
        console.log(event)

    } catch (err) {
        
        res.json(err)
    }
}

module.exports = {
    event_details_get,
    event_update_put,
    event_delete,
    event_search_get,
    event_findall_get,
}
