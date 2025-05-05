import User from "../models/user.model.js"

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