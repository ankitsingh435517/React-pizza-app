const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if(!this.isModified('Password')){
        next();
    }
    this.Password = await bcrypt.hash(this.Password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.Password);
}

module.exports = mongoose.model('User', userSchema, 'users');