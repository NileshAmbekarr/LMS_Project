import crypto from 'crypto';
import fs from 'fs/promises'

import cloudinary from 'cloudinary';
import asyncHandler from '../middleware/asyncHandler.middleware.js';
import sendEmail from '../utils/sendEmail.js';
import AppError from '../utils/appError.js';
import user from '../models/user.model.js';
import User from '../models/user.model.js';

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
    httpOnly : true,
}

// Total of 8 functions are there for a user "Normal User", 

/**
 * @REGISTER
 * @ROUTE @POST {{URL}}/api/v1/user/register
 * @ACCESS Public
 */
export const registerUser = asyncHandler(async(req, res, next) => {
    // Destructing the necessary data from req object
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All fields are Required !!', 400));
    }

    // check if the user exist with the provided email

    const userExist = await User.findOne({email});

    if(userExist) {
        return next(new AppError('User Already Exist ! Please logIn ', 409));
    }

    // Create  new User with the given4 Necessary data and save to DB

    const user = await User.create({
        fullName,
        email,
        password, 
        avatar:{
            public_id: email,
            secure_url: ""
        }
    });

    // If user Not created Send Massage responce

    if(!user){
        return next(new AppError('User RegiStration Failed please try again later ', 400))
    }

    // Run only if user sends a file 

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms', // save fiel in a folder named 'lms'
                width : 250,
                height: 250,
                gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image 
                crop : 'fill'

            });
        } catch (error) {
            return next(
                new AppError(error || "File Not uploaded , Please try again ", 400)
            );
        }
    }

    // save the user Object

    await user.save();

    // Generating a JWT token 
    const token = await user.generateJWTToken();

    // Setting the password to undefined so it does not get sent in email response
    user.password = undefined;

    // setting the token in the cookie with the name token along with cookieOptions 
    res.cookie('token', token , cookieOptions)
    
    // If all good send the responce to the Frontend 

    res.status(201).json({
        success:true,
        massage: 'user registered succesfully ',
        user
    })
})

/**
 * @LOGIN
 * @ROUTE @POST {{URL}}/api/v1/user/login
 * @ACCESS Public
 */
export const loginUser = asyncHandler(async(req, res, next) => {
    // DEstructiong the necessary data from request bidy
    const {email , password} = req.body;

    if(!email || !password){
        return next(new AppError('Email and Paaword is required ', 400))
    }

    // Finding the user with the given email 
    const user = await User.findOne({email}).select('+password');

    //If no user exist or sent password do not match then send genweric responce 
    if(!(user && (await user.comparePassword(password)))){
        return next(
            new AppError('Email or Password do not match or user does not exist ', 401)
        )
    }

    // Generating a JWT token 
    const token = await user.generaqteJWTToken();

    // Settignthe password to undefines so it does not get snet in responce 
    user.password = undefined;

    // Settign the token in the cookie with the name tioken along with cookieOptions 
    res.cookie('token', token, cookieOptions);

    // IF alll good send the responce to the frontend 
    res.status(200).json({
        success: true,
        massage: 'User Logged in successfully ',
        user,
    })
});

/**
 * @LOGOUT
 * @ROUTE @POST {{URL}}/api/v1/user/logout
 * @ACCESS Public
 */

export const logoutUser = asyncHandler(async(req, res, next) => {
    // Settign the cookie value into null
    res.cookie('token', null {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 0,
        httpOnly: true,
    })
    // After this the cookie values are set to null , means use is logged out 

    // sending the responce 
    res.status(200).json({
        success: true,
        massage:'Use logged out successfully',
    })
    
})

/**
 * @LOGGED_IN_USER_DETAILS
 * @ROUTE @GET {{URL}}/api/v1/user/me
 * @ACCESS Private(Logged in users only)
 */

export const getLoggedInUserDetails = asyncHandler(async (req, res, next) => {
    // Finding the user using the id from modified req object 
    const user = await User.findById(user.req.id)
    res.status(200).json({
        success: true,
        massage: 'User Details ',
        user
    })
})

/**
 * @FORGOT_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset
 * @ACCESS Public
 */
export const forgotPassword = asyncHandler(async(req, res, next)=> {
    // Extracting the email fron request body
    const {email } = req.body;

    if(!email){
        return next(
            new AppError('email id Required', 400)
        )
    }

    // Finding the user 
    const user = await User.findOne({email})

    // If no user found send themasssage email not required 
    if(!user){
        return next(
            new AppError('Email Not registred ', 400)
        )
    }
    //Genatating the  reting data 
})

/**
 * @RESET_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset/:resetToken
 * @ACCESS Public
 */
export const resetPassword = asyncHandler(async(req, res, next) => {

})

/**
 * @CHANGE_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/change-password
 * @ACCESS Private (Logged in users only)
 */
export const changePassword = asyncHandler(async(req, res, next) => {

})

/**
 * @UPDATE_USER
 * @ROUTE @POST {{URL}}/api/v1/user/update/:id
 * @ACCESS Private (Logged in user only)
 */

export const updateUser = asyncHandler(async(req, res, next) => {

})

