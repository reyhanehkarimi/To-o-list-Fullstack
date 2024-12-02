const mongoose = require("mongoose");
const bcrypt =require("bcryptjs"); 
const { type } = require("@testing-library/user-event/dist/cjs/utility/type.js");
const { STRING } = require("sequelize");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],    
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function(next){
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch (error) {
       next(error) 
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;