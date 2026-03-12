import cloudinary from "./cloudinary.js"
import { Readable } from "stream"

// Uploads a buffer to Cloudinary using a stream.
export const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable()
    readable._read = () => {}
    readable.push(buffer)
    readable.push(null)

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error)
          return reject(error)
        }
        resolve(result)
      },
    )

    readable.pipe(uploadStream)
  })
}