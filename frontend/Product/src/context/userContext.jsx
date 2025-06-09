import { createContext, useState, useContext, useEffect } from "react";
import {
    profileRequest,
    usersRequest,
    getUserRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest
} from '../api/user.js';
import { useAuth } from '../context/authContext.jsx';

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { user, isAuthenticated } = useAuth();

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const res = await profileRequest();
            setProfile(res.data);
            setError(null);
        } catch (err) {
            setProfile(null);
            setError(err.response?.data?.message || 'Error fetching profile');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await usersRequest();
            setUsers(res.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching users');
        }
    };

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error getting user');
        }
    };

    const createUser = async (userData) => {
        try {
            const res = await createUserRequest(userData);
            setUsers(prev => [...prev, res.data]);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error creating user');
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const res = await updateUserRequest(id, userData);
            setUsers(prev => prev.map(u => (u._id === id ? res.data : u)));
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error updating user');
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteUserRequest(id);
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error deleting user');
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchUserProfile();
        } else {
            setProfile(null);
            setLoading(false);
        }
    }, [user, isAuthenticated]);

    // Fetch users when profile is loaded and user is admin
    useEffect(() => {
        if (profile && profile.role === 'Administrator') {
            fetchUsers();
        }
    }, [profile]);

    return (
        <UserContext.Provider value={{
            profile,
            users, // Cambiado de userList a users
            loading,
            error,
            fetchUserProfile,
            fetchUsers,
            getUser,
            createUser,
            updateUser,
            deleteUser
        }}>
            {children}
        </UserContext.Provider>
    );
};