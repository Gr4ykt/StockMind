import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound.id,
        username: userFound.username,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email,
        role: userFound.role,
        created: userFound.createdAt
    })
}

export const getUsers = async (req, res) => {
    try{
        const user = await User.find({role:"Active"})
        res.json(user)
    }catch(error){
        return res.status(500).json({"message": error.message})
    }
}

export const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user) res.status(400).json({message: "User not found"});
        res.json(user)
    }catch(error){
        return res.status(500).json({"message": error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) res.status(404).json({message: "User not found"});

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    const { email, password, username, name, lastname } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email already exists"]);
        const role = "Active";
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
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};