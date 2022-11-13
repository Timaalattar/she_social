const { json } = require('express')
const Confirmed = require('../models/Confirmed')

async function confirmed_create_post(req,res) {
    try {
        const newConfirmation= await Confirmed.create({
            Confirmation: req.body.Confirmation    
        })
        res.json(newConfirmation)
    } catch (err) {
        res.json(err)
    }
}

async function confirmed_details_get(req,res) {
    try {
        const confirmed = await Confirmed.findById(req.params.confirmedid)
        res.json(confirmed)
    } catch (err) {
        res.json(err)
    }
}

async function confirmed_delete(req,res) {
    try {
        let deleteConfirmation= await User.findByIdAndDelete(req.params.confirmedid)
        // res.json({message: 'Confirmation delete successfully'})
        res.json(deleteConfirmation)
    } catch (err) {
        res.json(err)
    }
}

async function confirm_search_get(req,res) {
    try {
        const allConfirmation = await Confirmed.find()
         res.json(allConfirmation)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    confirmed_create_post,
<<<<<<< HEAD
    confirmed_details_get,1
=======
    confirmed_details_get,
>>>>>>> ddc2645e8beb798854a3b57b34454d5baa871f79
    confirmed_delete,
    confirm_search_get,
}
