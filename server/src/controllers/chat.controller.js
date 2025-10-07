import { generateToken } from '../lib/stream.config.js'

export const getStreamToken = async (req, res) => {
  try {
    const token = generateToken(req.user.id)

    res.status(200).json({ token })
  } catch (error) {}
}
