import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (name && email && password) {
            console.log(name, email, password);
            return res
                .status(200)
                .json(new ApiResponse(200, { name, email, password }, "User data received successfully"));
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Validation Error", ["Name, Email, Password shouldn't be empty."]));
        }
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, "Server Error", ["Something went wrong while registering user."]));
    }



});