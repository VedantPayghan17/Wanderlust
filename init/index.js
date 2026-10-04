
import mongoose from 'mongoose';
import Listing from "../models/listing.js"; // This MUST have two dots
import initData from './data.js';

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    // Transform seed data to match the Listing schema
    const transformed = initData.data.map((item) => ({
      title: item.title,
      desc: item.description || item.desc || "",
      listingimage: item.image && item.image.url ? item.image.url : item.listingimage || "",
      price: item.price ? String(item.price) : "",
      location: item.location || "",
      country: item.country || "",
    }));
    await Listing.insertMany(transformed);
    console.log("✅ Data was initialized");
  } catch (err) {
    console.log("❌ Error initializing data:", err);
  }
};

const MONGO_URL = 'mongodb://127.0.0.1:27017/airbnb';
mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("✅ Mongo DB Connected");
    await initDB(); // Connection ke baad hi function chalao
  });