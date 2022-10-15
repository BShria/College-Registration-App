require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// using middleware express.static for serving static frontend files directly from backend
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;
// const uri = "mongodb://localhost:27017/registrationDB";
// establishing a database connection with local database registrationDB using mongoose
mongoose.connect(process.env.URI, { useNewUrlParser: true });

// console.log(process.env.URI);

// creating a schema for the collection
const registrationSchema = new mongoose.Schema({
    name: String,
    dob: String,
    gender: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    classX: String,
    classXII: String
});

// modelling a collection called registrations -> can be seen in Robo3T
const Registration = mongoose.model('Registration', registrationSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);
    const newRegistration = new Registration({
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        classX: req.body.marksten,
        classXII: req.body.markstwelve
    });
    newRegistration.save((err) => {
        if (err)
            console.log(err);
        else
            console.log("Data insertion Successful.");
            res.sendFile(__dirname + '/public/response.html');

    })
});

app.listen(port, () => {
    console.log('Server is live on port ' + port);
});