import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);

    return res
        .status(200)
        .json(new ApiResponse(200, name, "User registered successfully"));

});