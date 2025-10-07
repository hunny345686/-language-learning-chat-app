import { upsertStreamUser } from '../lib/stream.config.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'All field are required ' })
    }
    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 Characters ' })
    }
    const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!emailRgx.test(email)) {
      return res.status(400).json({ message: 'Email is invalid' })
    }

    const exitingUser = await User.findOne({ email })
    if (exitingUser) {
      return res.status(400).json({ message: 'Email is Already exist ' })
    }
    const imgIdx = Math.floor(Math.random() * 100) + 1

    const randomAvt = `https://avatar.iran.liara.run/public/${imgIdx}`

    const newUser = await User.create({
      email,
      password,
      fullName,
      profilePic: randomAvt,
    })

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || '',
      })
      console.log('stream user created ', newUser.fullName)
    } catch (error) {
      console.error('Error Creating stream user', error)
    }
    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })
    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      // secure: true, => Will chage it laater
    })

    return res.status(201).json({ success: true, user: newUser })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
  res.send('signup')
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordCorrect = await existUser.matchPassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userID: existUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })
    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      // secure: true, => Will chage it laater
    })
    res.status(200).json({ success: true, existUser })
  } catch (error) {
    console.log('Error==>', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({ success: true, message: 'Logout Successfully' })
}

export const onboard = async (req, res) => {
  console.log(req.user)
  try {
    const userid = req.user._id

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: 'All fields are required ',
        missingFields: [
          !fullName && 'fullName',
          !bio && 'bio',
          !nativeLanguage && 'nativeLanguage',
          !learningLanguage && 'learningLanguage',
          !location && 'location',
        ],
      })
    }

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    )
    if (!updatedUser) return res.status(404).json({ message: 'User not found' })

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || '',
      })
      console.log('stream user updated after onboarding ', updatedUser.fullName)
    } catch (error) {
      console.error('Error updating stream onboading', error)
    }
    res.status(200).json({ success: true, user: updatedUser })
  } catch (error) {
    console.log('Onboarding Error', error)
    res.status(500).json({ message: 'Internal Error' })
  }
}
