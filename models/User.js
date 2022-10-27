import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      minLenght: [2, 'Must be more than two charaters'],
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      minLenght: [2, 'Must be more than two charaters'],
      required: true,
    },
    lastName: {
      type: String,
      minLenght: [2, 'Must be more than two charaters'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLenght: [7, 'Add more characters'],
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
