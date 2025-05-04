import User from "../models/user.model.js"
import { createAccessToken } from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const hello = async (req, res) => {
    res.status(200);
    res.json({"message":"Hello World from USER API"});
};

export const register = async (req, res) => {
    const { email, password, username, name, lastname } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email already exists"]);
        const totalUsers = await User.countDocuments(); // Verificar cuantos usuarios hay
        const role = totalUsers === 0 ? "Administrator" : "Active";
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            name,
            lastname,
            email,
            password: passwordHash,
            role
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body
    try {

        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = await createAccessToken({id: userFound._id})

        res.cookie('token', token);
        res.status(200)
        res.json({"message": "Login successfully"});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies
    
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: 'Unauthorized'});

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: 'Unauthorized'});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    })
}