import User from "../models/userModel"
import cloudinary from "cloudinary"

import ErrorHandler from "../utils/errorHandler"
import catchAsyncErrors from "../middlewares/catchAsyncErrors"

import absoluteUrl from "next-absolute-url"
import sendEmail from "../utils/sendEmail"
// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Register user   =>   /api/auth/register
export const registerUser = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "bookit/avatars",
    width: "150",
    crop: "scale",
  })

  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

export const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.status(200).json({
    success: true,
    user,
  })
})

export const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name
    user.email = req.body.email

    if (req.body.password) user.password = req.body.password
  }

  // Update avatar
  if (req.body.avatar !== "") {
    const image_id = user.avatar.public_id

    // Delete user previous image/avatar
    await cloudinary.v2.uploader.destroy(image_id)

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "bookit/avatars",
      width: "150",
      crop: "scale",
    })

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    }
  }

  await user.save()

  res.status(200).json({
    success: true,
  })
})

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404))
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const { origin } = absoluteUrl(req)

  const resetUrl = `${origin}/password/reset/${resetToken}`

  const message = `Your password reset url is as follows: \n\n ${resetUrl} `

  try {
    await sendEmail({
      email: user.email,
      subject: "BookIT Password Recovery",
      message,
    })
    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
}

// Reset password   =>   /api/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    )
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400))
  }

  // Setup the new password
  user.password = req.body.password

  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  })
})

// Get all users   =>   /api/admin/users
export const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

export const getUserDetails = catchAsyncErrors(async (req, res) => {
  console.log(req.method)
  const user = await User.findById(req.query.id)

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

export const updateUserDetails = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    ame: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})
