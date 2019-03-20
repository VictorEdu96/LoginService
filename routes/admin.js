const path = require('path');

const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
})

router.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
})

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
})



module.exports = router;