import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL)
    console.log('DB Connected ' + conn.connection.host)
  } catch (error) {
    console.log(`somthing went wrong ${error}`)
    process.exit(1)
  }
}
