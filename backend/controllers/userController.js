import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export default class UserController {
    static async getAllUsers(_, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    static async createUser(req, res) {
        const {email, password, username, firstName, lastName, bio, avatar} = req.body;
       
        if (!email || !password || !username || !firstName || !lastName) {
            return res.status(400).json({error: 'All fields are required'});
        }

        try {
            // Check if user exists
            const existingUser = await UserModel.getUserById(email);
            if (existingUser) {
                return res.status(400).json({error: 'User already exists'});
            }

            if (password.length < 8) {
                return res.status(400).json({error: 'Password must be at least 8 characters long'});
            }
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await UserModel.createUser(email, hashedPassword, username, firstName, lastName, bio, avatar);
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;  // Changed from email to id to match route parameter
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}