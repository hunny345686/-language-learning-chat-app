import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import cors from 'cors'
import path from 'path'

import { connectDB } from './lib/db.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT
const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // allow frontend to send cookies
  })
)
app.use('/api/auth/', authRoute)
app.use('/api/user/', userRoute)
app.use('/api/chat/', chatRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log('server is running  on 5001')
  connectDB()
})
