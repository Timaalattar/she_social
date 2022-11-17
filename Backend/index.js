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


// Cloudinary test - can remove and put in other files later
const { cloudinary } = require("./utils/cloudinary");

// const bodyParser = require('body-parser')

app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({ limit: '50mb',})
);



app.get('/api/images', async (req, res) => {
    console.log("/image");
  const {resources} = await cloudinary.search.expression('folder:bnjbdd6e')
  .sort_by('public_id', 'desc')
  .max_results(30)
  .execute();
  const publicIds = resources.map( file => file.public_id);
  res.send('publicIds')
})
app.post('/api/upload', async (req, res) => {
    console.log("/upload");
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'agora_images'
      })
      console.log(uploadedResponse.url)
      User.findById(req.query.userId)
      .then((user) => {
        user.cloudinary_url = uploadedResponse.url;
        user.save();
        res.json({ msg: "Wooo" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "not working" });
  }
});


// Listening on a port
app.listen(4000, () => {
    console.log('App listening on port 4000!')
})



