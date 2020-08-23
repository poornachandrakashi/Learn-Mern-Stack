const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

//Using Mong Model
const User = require('../../models/User');


//@route       POST api/users
//Description  Register USer
//access       Public

router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include Valid Email').isEmail(),
    check('password','please enter a password with 6 or more charaters').isLength({ min:6 })
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name,email,password } = req.body; 
    try{
    //See if User exits
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({ errors: [{msg: 'User alredy Exists'}]});
        }


    // Gets user Gravitar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password //its not encrypted yet
        });
        //Encrypt password   using bycrpt
        const salt = await bcrypt.genSalt(10);


        user.password = await bcrypt.hash(password,salt);

        await user.save();

        //Return JsonWebtokens

        //Create a payload
        
        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    //console.log(req.body);
    }catch(err){
        console.log(err.message);
        res.send(500).send('Server Error');
    }
});

module.exports = router;