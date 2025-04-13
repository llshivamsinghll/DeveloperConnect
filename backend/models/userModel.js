import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserModel {
    static async getAllUsers() {
        try {
            return await prisma.user.findMany();
        }
        catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    static async createUser(email, password, username, firstName, lastName, bio, avatar) {
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                    bio,
                    avatar
                }
            });
            return user;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async getUserById(email) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            return user;
        }
        catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }
}