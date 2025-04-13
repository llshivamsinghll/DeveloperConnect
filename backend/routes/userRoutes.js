import UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// Route to get all users   
router.get("/", UserController.getAllUsers);  // Fixed to use controller instead of model

// Route to create a new user   
router.post("/", UserController.createUser);

// Route to get a user by ID
router.get("/:id", UserController.getUserById);

export default router;