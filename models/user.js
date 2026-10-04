
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

console.log("passportLocalMongoose =", passportLocalMongoose);
console.log("type =", typeof passportLocalMongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// it will automatically add usernaem pass, hashing, and salting for us so we dont need to build this form scratch
userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User", userSchema);

export default User;