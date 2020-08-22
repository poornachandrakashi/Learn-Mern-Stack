const express = require('express');
const router= express.Router();

//@route api api/profile
//access Public

router.get('/',(req,res) => res.send('Profile Route'));

module.exports = router;