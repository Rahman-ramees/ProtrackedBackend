const express = require('express');
const router = express.Router();

// mongodb user model
const User = require('./../model/User');

// env variables
require("dotenv").config();

// password handler
const bcrypt = require('bcryptjs');



// Signup
router.post('/signup', async (req, res) => {
  let { name, email, password, dateofbirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateofbirth = dateofbirth.trim();

  if (name === '' || email === '' || password === '' || dateofbirth === '') {
    return res.json({
      status: 'Failed',
      message: 'Empty Input fields!',
    });
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    return res.json({
      status: 'Failed',
      message: 'Invalid Name entered ',
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.json({
      status: 'Failed',
      message: 'Invalid Email entered ',
    });
  } else if (!new Date(dateofbirth).getTime()) {
    return res.json({
      status: 'Failed',
      message: 'Invalid Date of birth entered ',
    });
  } else if (password.length < 8) {
    return res.json({
      status: 'Failed',
      message: 'Password is too short!',
    });
  } else {
    try {
      // checking if user already exists
      const result1 = await User.find({ email });
      if (result1.length) {
        // A user already exists
        return res.json({
          status: 'Failed',
          message: 'User with the provided email already exists',
        });
      }

      // try to create user

      // password handling
      const saltrounds = 10;
      const hashedpassword = await bcrypt.hash(password, saltrounds);

      const newUser = await new User({
        name,
        email,
        password: hashedpassword,
        dateofbirth,
      });

      const result = await newUser.save();
      return res.json({
        status: 'SUCCESS',
        message: 'Signup successful',
        data: result,
      });
    } catch (err) {
      return res.json({
        status: 'Failed',
        message: 'An error occurred while creating user account!',
      });
    }
  }
});

// Signin
router.post('/signin', async (req, res) => {
  // Your signin logic here
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if( email === '', password === ''){
    return res.json({
      status:"Failed",
      message:"Empty Credential Supply"
    })
  }else{
    // Check if user exist
    User.findOne({email})
    .then((data) => {
      if (data) {
        // User exists
        const hashedpassword = data.password
        bcrypt.compare(password,hashedpassword).then(result =>{
          if (result) {
            // password match
            res.json({
              status:"SUCCESS",
              message:"Signin Successful",
              data:data
            })
          }else{
            res.json({
              status:"FAILED",
              message:"Invalid Password entered!"
            })
          }
        }).catch(err => {
          res.json({
            stasus:"FAILED",
            message:"An error occurred while comparing password"
          })
        })
      }else{
        res.json({
          status:"FAILED",
          message:"Invalid credantials entered!"
        })
      }
    }).catch(err => {
      res.json({
        status:"FAILED",
        message:"An error occurred while checking for existing user"
      })
    })
  }

});

module.exports = router;