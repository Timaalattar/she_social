const { json } = require('express')
const Event = require('../models/Event')

async function event_create_post(req,res) {
    try {
    } catch (err) {
        res.json(err)
    }
}

async function event_details_get(req,res) {
    try {
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
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    event_create_post,
    event_details_get,
    event_update_put,
    event_delete,
    event_search_get,
}
