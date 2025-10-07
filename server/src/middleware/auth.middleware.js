import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized! => No Token' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized! => Invalid token' })
    }

    const user = await User.findById(decoded.userID).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized! => User Not found' })
    }

    req.user = user

    next()
  } catch (error) {
    console.log('Error in protected route ', error)
  }
}
