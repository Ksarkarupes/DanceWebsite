const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');

// Schema Definition
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Added extended: true to fix warnings

// View Engine Setup - FIXED THE SPACE IN 'pug'
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views'));

// --- ROUTES ---

// Home Page
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

// Academy Page
app.get('/about', (req, res) => {
    res.status(200).render('academy.pug');
});

// Programs Page
app.get('/classes', (req, res) => {
    res.status(200).render('programs.pug');
});

// Studio Page
app.get('/services', (req, res) => {
    res.status(200).render('studio.pug');
});

// Contact Page
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

// Post Route for Contact Form
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Your response has been submitted");
    }).catch(() => {
        res.status(400).send("Item could not be saved");
    });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Running successfully on http://localhost:${port}`);
    });
}