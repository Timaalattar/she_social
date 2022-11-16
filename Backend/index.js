const express = require('express')
const cors = require('cors')
const path = require('path')
// Initializing our application
const app = express()

require('dotenv').config()
require('./config/database')

// Mount our middleware
//....
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/events'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/confirmed'))

//REACT Below
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Listening on a port
app.listen(4000, () => {
    console.log('App listening on port 4000!')
})



