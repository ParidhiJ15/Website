const express = require("express")
const { route } = require('express/lib/application')
const routes = express.Router()
const loginData = require('../modules/loginSchema')



routes.get("/", (request, response) => {
    response.render("index.ejs")
})



routes.get('/signup', (req, res) => {
    res.render('signup.ejs', { msg: "Welcome to kraftLand" });
});


routes.post("/signup", async(req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    }

    try {
        const check = await loginData.findOne({ email: req.body.email })
        if (check.email === req.body.email) {
            res.render('signup.ejs', { msg: "User already exist" })
        }
    } catch {
        await loginData.insertMany([data])
        console.log(data)
        res.render('login.ejs', { msg: "Login here" })
    }
});

routes.get('/login', (req, res) => {
    res.render('login.ejs', { msg: "Register here" });
});

routes.post("/login", async(req, res) => {
    try {
        const check = await loginData.findOne({ username: req.body.username })
        if (check.password === req.body.password) {
            res.render('index.ejs', { msg: check.name })
        } else {
            res.render('login.ejs', { msg: "Your password is incorrect ! Please enter correct password" })
        }
    } catch {
        res.render('login.ejs', { msg: "Wrong credentials" })
    }
});



routes.get('/update', (req, res) => {
    res.render('update.ejs', { msg: "Update your password here" });
});

routes.post("/update", async(req, res) => {

    const check = await loginData.findOne({ email: req.body.email })
    if (check.email === req.body.email) {
        console.log(req.body.password)
        loginData.updateOne({ email: check.email }, {
            $set: { password: req.body.password }
        })
        console.log(check)
        res.render('login.ejs', { msg: "Login with new password" })
    } else {
        res.render('update.ejs', { msg: "No account with this email.Please Enter valid email id" })
    }

});

routes.delete("/deleteAccount", async(req, res) => {
    const check = await loginData.findOne({ email: req.body.email })
    if (check.email === req.body.email) {
        console.log(req.body.password)
        loginData.deleteOne({ email: check.email })
        console.log(check)
        res.render('signup.ejs', { msg: "Delete successfully! Add new account" })


    } else {
        res.render('signup.ejs', { msg: " account does not exist" })
    }
})


// db.collection('users').updateOne({ username: 'john.doe' }, { $set: { email: 'john.doe@example.com' } },
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//         // Close the client
//         client.close();
//     }
// );

// router.post('/update', function(req, res, next) {
//     indexmodel.update(req.body).then((resu) => {
//         if (resu) {
//             res.render('update.ejs', { msg: "updated" });

//         } else {
//             res.render('update.ejs', { msg: "sorry your password is not found " });
//         }

//     }).catch((err) => {
//         console.log(err);
//     });

// });



routes.get('/greetingcards', (req, res) => {
    res.render('greetingcard.ejs');
});

routes.get('/vases', (req, res) => {
    res.render('vases.ejs');
});








module.exports = routes