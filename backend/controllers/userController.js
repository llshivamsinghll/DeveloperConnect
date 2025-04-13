import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export default class UserController {
    static async getAllUsers(_, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createUser(req, res) {
        const { email, password, username, firstName, lastName, bio, avatar } = req.body;

        // Validate required fields
        if (!email || !password || !username || !firstName || !lastName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            // Check if user exists
            const existingUser = await UserModel.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Validate password strength
            if (password.length < 8) {
                return res.status(400).json({ error: 'Password must be at least 8 characters' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const user = await UserModel.createUser(
                email,
                hashedPassword,
                username,
                firstName,
                lastName,
                bio,
                avatar
            );
            
            // Return response without sensitive data
            res.status(201).json({
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                bio: user.bio,
                avatar: user.avatar,
                createdAt: user.createdAt
            });
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getCurrentUser(req, res) {
        try {
            const user = await UserModel.getUserById(req.user.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                bio: user.bio,
                avatar: user.avatar,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                role: user.role
            });
        } catch (error) {
            console.error('Error getting current user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}