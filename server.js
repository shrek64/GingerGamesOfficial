const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const path = require('path');
const axios = require('axios');
const {logger, logEvents} = require('./middleware/logEvents.js');
const {errorHandler} = require('./middleware/errorHandler.js');

const PORT = process.env.PORT || 10000;

app.use(logger);

app.use(cors(corsOptions));
//load other files
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root.js'));
app.use('/employees', require('./routes/api/employees.js'));

//404 errors
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
