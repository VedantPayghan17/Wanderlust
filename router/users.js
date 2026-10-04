import express, { Router } from 'express';
const router = express.Router({ mergeParams: true });
import User from '../models/user.js';
import wrapAsync from '../utils/wrapAsync.js';
import passport from 'passport';


router.get("/signup", (req, res) => {
    res.render("users/signup");
});

// register user
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({
            username: username,
            email: email
        });

        let registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        req.flash("success", "welcome to wanderlust");
        res.redirect("/listings");
    }
    catch (e) {
        req.flash("Error : ", e.msg);
        res.redirect("/signup");
    }

}));

//login user
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs", { error: req.flash("error") });
});

router.post("/signin",
    passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid username or password.'
    }),
    async (req, res) => {
        req.flash("success", "Logged in successfully!");
        res.redirect('/listings');
    });

export default router;