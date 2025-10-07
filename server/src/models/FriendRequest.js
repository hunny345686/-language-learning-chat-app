import mongoose from 'mongoose'

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      require: true,
    },
    recipient: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      require: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

export default FriendRequest
