import express from "express";
const router = express.Router();

import Listing from "../models/listing.js";
import methodOverride from "method-override";
import wrapAsync from "../utils/wrapAsync.js";
import { schema } from "../schema.js";
import ExpressError from "../utils/ExpressError.js";

// method override
router.use(methodOverride("_method"));


// Validation Middleware
const validateListing = (req, res, next) => {
    let { error } = schema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    next();
};


// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));


// NEW ROUTE
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});


// CREATE ROUTE
router.post("/",
    validateListing,
    wrapAsync(async (req, res) => {

        let { title, desc, listingimage, price, location, country } =
            req.body.listing;

        const listings = await Listing.create({
            title,
            desc,
            listingimage,
            price,
            location,
            country
        });

        console.log(listings);
        res.redirect("/listings");
    })
);


// SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let listid = await Listing.findById(id).populate("reviews");

    res.render("listings/show", { listid });
}));


// EDIT ROUTE
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let listings = await Listing.findById(id);

    res.render("listings/edit.ejs", { listings });
}));


// UPDATE ROUTE
router.put("/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        let { title, desc, listingimage, price, location, country } =
            req.body.listing;

        let updatedListing = {
            title,
            desc,
            listingimage,
            price,
            location,
            country
        };

        await Listing.findByIdAndUpdate(id, updatedListing);

        res.redirect("/listings");
    })
);


// DELETE ROUTE
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
}));


export default router;