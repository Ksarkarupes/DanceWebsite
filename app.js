const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', ' pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req, res)=>{
    const param = {};
    res.status(200).render('home.pug', param);
});

app.get('/contact',(req, res)=>{
    const param = {};
    res.status(200).render('contact.pug', param);
});
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your response have been submitted");
    }).catch(()=>{
        res.status(400).send("Item couldnot be saved");
    });
    
});

  app.listen(port, ()=>{
    console.log(`Running succesfully on ${port}`);
});
