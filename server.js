const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const {logger, logEvents} = require('./middleware/logEvents.js');
const {errorHandler} = require('./middleware/errorHandler.js');

const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('CORS BLOCKED NIGGA'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));
//load other files
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/subdir', require('./routes/subdir.js'));

//serve files
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/about(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/services(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});
app.get('/new-page(.html)?', (req, res) => {
    res.redirect(301, '/');
});
app.get('/poop(.html)?', (req, res) => {
    res.redirect(301, 'https://secure.actblue.com/');
})
app.get('/2024(.html)?', (req, res) => {
    res.redirect(301, 'https://winred.com/');
})

//404 errors
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));