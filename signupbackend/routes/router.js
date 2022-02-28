const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModel");

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        fullname: request.body.fullname,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    });
    signedUpUser
        .save()
        .then((data) => {
            console.log("User Added");
            response.json(data);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        });
});

router.get('/addedUser',async (request,response)=>{
    const users = await signUpTemplateCopy.find();
    let arr = [];
    for (var i=0;i<users.length;i++){
        arr.push(users[i].username)
    }
    response.json(users);
});

// router.get('/signin', (request, response) => {

// });

module.exports = router;