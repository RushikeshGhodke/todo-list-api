import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import db from "../db/index.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (name && email && password) {
            const existingEmail = await db.User.findOne({ where: { email } });
            if (existingEmail) {
                return res
                    .status(409)
                    .json(new ApiError(409, "Conflict", ["User with this email already exists."]));
            }

            const existingName = await db.User.findOne({ where: { name } });
            if (existingName) {
                return res
                    .status(409)
                    .json(new ApiError(409, "Conflict", ["User with this name already exists."]));
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser = await db.User.create({
                name,
                email,
                hashed_password: hashedPassword
            });

            const userData = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };

            return res
                .status(201)
                .json(new ApiResponse(201, userData, "User registered successfully"));
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Validation Error", ["Name, Email, Password shouldn't be empty."]));
        }
    } catch (error) {
        console.error("Registration error:", error);
        return res
            .status(500)
            .json(new ApiError(500, "Server Error", ["Something went wrong while registering user.", error.message]));
    }
});