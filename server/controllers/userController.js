
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Task = require("../models/task");

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully',  newUser});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("Email entered:", email);
        console.log("Password entered:", password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Stored hashed password:", user.password);

        const passwordValid = await bcrypt.compare(password, user.password);
        
        console.log("Password valid:", passwordValid);

        if (!passwordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "defaultSecret",  
            { expiresIn: '1h' }  
        );

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { username: user.username, email: user.email }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10); 

        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const { id } = req.params; 
        const tasks = await Task.find({ userId: id }); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




