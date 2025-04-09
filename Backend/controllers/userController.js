import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
    )
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Create token
        const token = createToken(user._id); // Assuming this returns a JWT
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error("Error while logging in user", error);
        return res.status(500).json({ success: false, msg: "Internal server error: while logging in user" });
    }
};


//Route for user registration

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check user exists or not
        const exists = await userModel.findOne({ email });

        if (exists) {
            // Added return to prevent further execution after response is sent
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Invalid email : Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ msg: "Password too weak: Please enter a password with at least 8 characters" });
        }

        //hasing password
        const salt = await bcrypt.genSalt(10); //5-15
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        //save user in database
        //const user = await newUser.save(); no need because create() already saves the user.

        //create token
        const token = createToken(newUser._id); 
        res.json({ success: true, token });

    } catch (error) {
        console.log("Error while registering user", error);
        res.status(500).json({ success: false, msg: "Internal server error: while registering user" });
    }
}


export { loginUser, registerUser }