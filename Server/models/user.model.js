import {Schema , model} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// DEfine User Schema 
const userSchema = new Schema({
    fullName: {
        type : String,
        required:[true, 'Name is Required '],
        minlength : [5, 'Name Should Be at least 5 characters '],
        maxlenght : [50, 'Name should not be more than 50 Characters '],
        lowercase : true,
        trim : true , // REmoves unnecccesary spaces 

    },
    email: {
        tyoe : String,
        required: [true, 'Email is required ! '],
        unique: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Please enter a valid Email Address ']
        // This is an Email validation regex , It cheks whether the user has enterede a valid email or not 
    },
    password: {
        type: String,
        required: [true, 'Passoword is Required'],
        minlength:[8, 'Password must be at least 8 Characters ! '],
        select: false , // This line prevents password from database selsction, means we can not access the user Passwod until we need it explicitly 
    },
    avatar:{
        public_id :{
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    subscription: {
        id: String,
        status: String
    },

    // tokens
    forgotPasswordToken : String ,
    forgotPasswordExpiry : String,
},
{
    timestamps: true,
});


userSchema.methods = {
    // method to compare plain password with hashed password and return true or false

    comparePassword: async function(plainPassword){
        return await bcrypt.compare(plainPassword, this.password)
    },

    // This method will generate a JWT token with userID as payload 

    generateJWTToken : async function(){
        return await jwt.sign(
            {
                id: this._id,
                role: this.role,
                subscription : this.subscription
            },
            process.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_EXPIRY,
            }
        );
    },

    // This will gnerate a token for Password reset

    generatePasswordResetToken: async function(){
        // creating a random token using node's built in crypto module 
        const resetToken = crypto.randonBytes(20).toString('hex');

        // again using crypto module to hash the generarted resetTooken with 'sha256' algorithm and storing it in database 
        this.forgotPasswordToken= crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        // Adding frogot Password expiry to 15 minutes 
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

        return resetToken;
    }
}

const User = model('User', userSchema);

export default User;