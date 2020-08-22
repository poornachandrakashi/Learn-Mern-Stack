const express = require('express');
const router= express.Router();

//@route api api/auth

router.get('/',(req,res) => res.send('auth Route'));

module.exports = router;