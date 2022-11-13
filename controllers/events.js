const { json } = require('express')
const Event = require('../models/Event')

async function event_create_post(req,res) {
    
    // for testing purposes
    console.log('Req Body:', req.body)
    
    try {
      let newEvent= await Event.create({
        
        EventName: req.body.EventName,
        Date: req.body.Date,
        Time: req.body.Time,
        Locate: req.body.Locate,
        Category:req.body.Category,
        Description:req.body.Description
        
        })
res.json(newEvent)

    } catch (err) {
        res.json(err)
    }
}

async function event_details_get(req,res) {
    
    try {
const event = await Event.findById(req.params._id)
res.json(event)
    } catch (err) {
        res.json(err)
    }
}

async function event_update_put(req,res) {
    try {
    } catch (err) {
        res.json(err)
    }
}

async function event_delete(req,res) {
    try {
    } catch (err) {
        res.json(err)
    }
}

async function event_search_get(req,res) {
    try {
        let event = await Event.find({Category: req.params.category})
        res.json(event)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    event_create_post,
    event_details_get,
    event_update_put,
    event_delete,
    event_search_get
}
