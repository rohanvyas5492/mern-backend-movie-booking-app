const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    }
}, { timestamps: true });

userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email});
    if(!user) return {status:'failed',message:'User not found'};
    const salt = user.salt;
    const hashedPassword = user.password;
    const userPassword = createHmac('sha256',salt).update(password).digest('hex');
    if(userPassword !== hashedPassword) return {status:'failed',message:'Incorrect password'};
    return {status:'success',message:user};
});

userSchema.pre('save', async function(next) {
    const user = this;

    // Generate a new salt and hash the password only if it's modified
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
        
        user.password = hashedPassword;
        user.salt = salt;
        
        next();
    } catch (error) {
        return next(error); // Pass the error to the next middleware
    }
});

const User = model('User', userSchema);

module.exports = User;
