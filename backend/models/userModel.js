import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserModel {
    static async getAllUsers() {
        try {
            return await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                    role: true
                }
            });
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    static async createUser(email, password, username, firstName, lastName, bio, avatar) {
        try {
            return await prisma.user.create({
                data: {
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                    bio,
                    avatar,
                    role: 'USER' // Default role
                }
            });
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await prisma.user.findUnique({
                where: { email }
            });
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            return await prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    bio: true,
                    avatar: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                    refreshToken: true
                }
            });
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }

    static async updateRefreshToken(id, refreshToken) {
        try {
            return await prisma.user.update({
                where: { id: Number(id) },
                data: { refreshToken }
            });
        } catch (error) {
            console.error('Error updating refresh token:', error);
            throw error;
        }
    }
}