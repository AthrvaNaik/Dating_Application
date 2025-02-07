import User from "../Models/User.models.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

export const signup = async(req, res) => {
    // res.send("signup");
    const { name, email, password, age, gender, genderPreference } = req.body;
    try {
        if(!name || !email || !password || !age || !gender || !genderPreference){
            return res.status(400).json({ message: "Please fill in all fields",success: false });
        }
        if(age < 18){
            return res.status(400).json({ message: "You must be at least 18 years old",success: false });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters",success: false });
        }
        const newUser = await User.create({
            name,
            email,
            password,
            age,            
            gender,
            genderPreference
        });

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })
        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log("signupController error::", error);
        res.status(500).json({ message: error.message,success: false });
    }
};

export const login = async(req, res) => {
    // res.send("login");
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({ message: "Please fill in all fields",success: false });
        }
        const user = await User.findOne({ email }).select("+password");

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({ message: "Invalid email or password",success: false });
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("loginController error::", error);
        res.status(500).json({ message: error.message,success: false });
    }
};

export const logout = async(req, res) => {
    // res.send("logout");
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful",success: true });
}