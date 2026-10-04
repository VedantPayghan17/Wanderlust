import mongoose from 'mongoose';
import Review from './review.js';
import { reviewSchema } from '../schema.js';
const Schema = mongoose.Schema;
//schema 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    listingimage: {
        type: String,
        default: "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        set: (v) =>
            v === "" ? "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" : v,
    },
    price: {
        type: String,
        required: true
    },
    location: String,
    country: String, 

    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
});

// Handling deleteion if reviews exist then delete when Listing delete
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing && listing.reviews.length) {
        let res = await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
        console.log(res);
    } else {
        console.log("No Listing found to delete.");
    }
});



const List = mongoose.model("List",listingSchema);

export default List;