const express = require('express');
const router = express.Router();
const path = require('path');

//serve files
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/about(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});
router.get('/services(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'services.html'));
});
router.get('/poop(.html)?', (req, res) => {
    res.redirect(301, 'https://secure.actblue.com/');
})
router.get('/2024(.html)?', (req, res) => {
    res.redirect(301, 'https://winred.com/');
})

module.exports = router;