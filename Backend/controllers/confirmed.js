const { json } = require('express')
const Confirmed = require('../models/Confirmed')
const User = require('../models/User')
const Event = require('../models/Event')


async function confirmed_create_post(req,res) {
    // Find the user that will create the event
   
    // let user = await User.findById(req.user.id)
    let user = await User.findById('63748af284067859a90e2500')
    let event = await Event.findById(req.params.eventId)
    //logic for creating the event
    console.log(user)
    console.log(event)
    let newConfirmed = await Confirmed.create({
        Confirmed: true,
        User: user._id,
        Event: event._id
    })
    // Push the new event ID into the user's 'Event' property
    user.Confirmed.push(newConfirmed._id)
    event.Confirmed = newConfirmed._id
    // Save our changes to the user
    await user.save()
    await event.save()
    // Respond with the user data
    // Populate the Event data
    // await user.populate('Confirmed')
    // await event.populate('Confirmed')
    await newConfirmed.populate('User')
    await newConfirmed.populate('Event')
    // console.log(Event)
    res.json(newConfirmed)   
}

async function confirmed_details_get(req,res) {
    try {
        const myConfirmed = await User.findById(req.params.userId)
        await myConfirmed.populate('Confirmed')
        res.json(myConfirmed)

    } catch (err) {
        res.json(err)
    }
}

async function confirmed_delete(req,res) {
    try {
        let deleteConfirmation= await Confirmed.findByIdAndDelete(req.params.confirmedId)
        // res.json({message: 'Confirmation delete successfully'})
        console.log(deleteConfirmation)
        res.json(deleteConfirmation)

    } catch (err) {
        res.json(err)
    }
}

async function confirm_search_get(req,res) {
    try {
        const allConfirmed = await Event.findById(req.params.eventId)
        await allConfirmed.populate('Confirmed')
        console.log(allConfirmed)
        res.json(allConfirmed)  
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    confirmed_create_post,
    confirmed_details_get,
    confirmed_delete,
    confirm_search_get
}
