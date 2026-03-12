import createHttpError from "http-errors"
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER_NAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

const sendEmailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER_NAME,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    }
    const info = await transporter.sendMail(mailOptions)
    // console.log("info", "Message sent: %s", info.response)
  } catch (error) {
    throw createHttpError(500, "failed to send verification email")
  }
}
export default sendEmailWithNodemailer
