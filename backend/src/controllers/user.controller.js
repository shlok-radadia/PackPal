import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    //            - check if email already exists
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response
    const { name, email, category, password } = req.body;
    // console.log("Email:", email);

    if(
        [name, email, category, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(
            400,
            "All fields are required"
        );
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if (existedUser) {
        throw new ApiError(
            409,
            "User with this email already exists"
        );
    }

    const user = await User.create({
        name,
        email,
        category,
        password
    })

    const createdUser = await User.findByIdAndUpdate(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Someything went wrong while registering the user"
        );
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export { registerUser };