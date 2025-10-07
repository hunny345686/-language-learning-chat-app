import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendsRequest,
  acceptFriendsRequest,
  getFriendsRequest,
  alreadySendFriendsRequest,
} from '../controllers/user.controller.js'

const router = express.Router()

// apply auth middleware to all routes
router.use(protectedRoute)

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)
router.post('/friends-request/:id', sendFriendsRequest)
router.put('/friends-request/:id/accept', acceptFriendsRequest)

router.get('/friends-request/', getFriendsRequest)
router.get('/outgoing-friends-request/', alreadySendFriendsRequest)

export default router
