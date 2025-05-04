import User from "../models/user.model.js"

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // asumimos que el token ya fue verificado y `req.user` existe

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== "Administrator") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
