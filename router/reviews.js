import express, { Router } from 'express';
const router = express.Router({mergeParams: true});

import Listing from "../models/listing.js";
import wrapAsync from '../utils/wrapAsync.js';
import {schema, reviewSchema} from "../schema.js";
import ExpressError from '../utils/ExpressError.js';
import Review from '../models/review.js';


// middleware for review validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    
    if (error) {
        // This maps over every error and joins them together into one string
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



// POST route for Reviews 
router.post("/",validateReview, wrapAsync( async (req, res)=>{
 const listing = await Listing.findById(req.params.id);
 // create new review 
 let newReview = new Review(req.body.review);

 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();
 console.log(' new review saved');
 res.redirect(`/listings/${req.params.id}`   );
}));


// delete route review
router.delete("/:reviewId",
wrapAsync(async (req,res)=>{
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

export default router;