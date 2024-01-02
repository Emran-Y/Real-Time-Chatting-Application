const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email : {
        type :String,
        required:true
    },
    password : {
        type :String,
        required:true
    },
    pic : {
        type :String,
        default:"https://icon-lpasibrary.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{timestamps:true})


userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password)
  } catch (error) {
    throw error
  }
}


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

const User = new mongoose.model('User',userSchema)

module.exports = User