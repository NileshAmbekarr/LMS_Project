import crypto from 'crypto';
import fs from 'fs/promises'

import cloudinary from 'cloudinary';
import asyncHandler from '../middleware/asyncHandler.middleware.js'
import user from '../models/user.model.js';

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

})

/**
 * @LOGIN
 * @ROUTE @POST {{URL}}/api/v1/user/login
 * @ACCESS Public
 */
export const loginUser = asyncHandler(async(req, res, next) => {

})

/**
 * @LOGOUT
 * @ROUTE @POST {{URL}}/api/v1/user/logout
 * @ACCESS Public
 */

export const logoutUser = asyncHandler(async(req, res, next) => {

})

/**
 * @LOGGED_IN_USER_DETAILS
 * @ROUTE @GET {{URL}}/api/v1/user/me
 * @ACCESS Private(Logged in users only)
 */

export const getLoggedInUserDetails = asyncHandler(async (req, res, next) => {

})

/**
 * @FORGOT_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset
 * @ACCESS Public
 */
export const forgotPassword = asyncHandler(async(req, res, next)=> {

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

