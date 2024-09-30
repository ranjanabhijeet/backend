import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken" //jwt is a bearer token
import bcrypt from "bcrypt"

const username = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar :{
        type: String,//cloudinary url
        required: true,
    },
    coverImage: {
        type: String,   //cloudinary url
    },
    watchHistory:[
         {
        type: Schema.Types.ObjectId,
        ref:"Video"
    }
],
    Password: {
        type:String,
        required: [true,'Password is required']
    },
    refreshToken: {
        type: String

    }

}
,
{
    timestamps: true
})

userSchema.pre("save",async function (next) {
    this.Password = bcrypt.hash(this.Password, 10)
    next();

    this.Password = bcrypt.hash(this.Password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (Password){
    return await bcryt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
      return jwt.sign(
        {
          _id: this._id,
          
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)

