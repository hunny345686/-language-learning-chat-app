import { StreamChat } from 'stream-chat'
import 'dotenv/config'

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apiKey || !apiSecret) {
  console.error('API AND SECRET IS MISSING')
}

const steamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async userData => {
  try {
    await steamClient.upsertUsers([userData])
    return userData
  } catch (error) {
    console.error('Error Creating Stream USER', error)
  }
}

//
export const generateToken = userId => {
  try {
    const userIdStr = userId.toString()
    return steamClient.createToken(userIdStr)
  } catch (error) {
    console.log('Error In Generating Steam Token')
  }
}
