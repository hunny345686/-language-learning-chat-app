import FriendRequest from '../models/FriendRequest.js'
import User from '../models/User.js'

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id
    const currentUser = req.user

    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    })

    res.status(200).json(recommendedUser)
  } catch (error) {
    console.log('Error in Recommended Controller', error)
  }
}
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('friends')
      .populate('friends', 'fullName profilePic nativeLanguage learningLanguage')
    res.status(200).json(user.friends)
  } catch (error) {
    console.log('Error in Friends Controller', error)
  }
}

export const sendFriendsRequest = async (req, res) => {
  try {
    const myId = req.user.id
    const { id: recipientId } = req.params

    if (myId == recipientId) {
      return res.status(400).json({ message: 'you can not send request to yourself' })
    }

    const recipient = await User.findById(recipientId)

    if (!recipient) {
      return res.status(400).json({ message: 'recipient Not found' })
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: 'you are already friends ' })
    }
    // Prevent sending req to yourself

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    })
    if (existingRequest) {
      res.status(400).json({ message: 'You have already send the friend req to this user ' })
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    })
    res.status(200).json(friendRequest)
  } catch (error) {
    console.log('error in send friend req', error)
    // res.status(400).json({ message: 'You have already send the friend req to this user ' })
  }
}

export const acceptFriendsRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params

    const friendRequest = await FriendRequest.findById(requestId)
    if (!friendRequest) {
      return res.status(404).json({ message: 'friend request not found' })
    }

    console.log(friendRequest.recipient.toString(), req.user.id)
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'you are not authorize to accept this req' })
    }

    friendRequest.status = 'accepted'
    await friendRequest.save()

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    })
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    })

    res.status(200).json({ message: 'Friend request accepted' })
  } catch (error) {
    console.log('Error in acceptFriendsRequest Controller ', error)
  }
}

export const getFriendsRequest = async (req, res) => {
  try {
    const incomingRequest = await FriendRequest.find({
      recipient: req.user.id,
      status: 'pending',
    }).populate('sender', 'fullName profilePic nativeLanguage learningLanguage')
    const acceptedRequest = await FriendRequest.find({
      sender: req.user.id,
      status: 'accepted',
    }).populate('recipient', 'fullName profilePic')

    res.status(200).json({ incomingRequest, acceptedRequest })
  } catch (error) {
    console.log('Error in getFriendsRequest controller ', error)
  }
}

export const alreadySendFriendsRequest = async (req, res) => {
  try {
    const alreadyRequest = await FriendRequest.find({
      sender: req.user.id,
      status: 'pending',
    }).populate('recipient', 'ullName profilePic nativeLanguage learningLanguage')
    res.status(200).json(alreadyRequest)
  } catch (error) {
    console.log('Error in alreadySendFriendsRequest controller ', error)
  }
}
