import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import db from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json(new ApiError(400, "Validation Error", ["Email and password are required."]));
        }

        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res
                .status(401)
                .json(new ApiError(401, "Authentication Failed", ["Invalid credentials"]));
        }

        console.log(password, user);
        
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json(new ApiError(401, "Authentication Failed", ["Invalid credentials"]));
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };

        return res
            .status(200)
            .cookie("token", token, {secure: true, httpOnly: true})
            .json(new ApiResponse(200, userData, "Login Successful"));
    } catch (error) {
        console.error("Login error:", error);
        return res
            .status(500)
            .json(new ApiError(500, "Server Error", ["Something went wrong during login"]));
    }
});

export const logout = asyncHandler(async (req, res) => {

});