import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schemas/userSchema.js'
import { generateJWT } from '../helpers/authHelper.js'

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const checkUser = await User.findOne({ email })

    if (!checkUser) {
      return res
        .status(404)
        .json({ error: 'Login with the correct credentials.' })
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password)
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials. Please try again.' })
    }

    const token = await generateJWT(checkUser)
    let responseData = {
      token,
      uploader: checkUser.name,
      userId: checkUser._id
    }

    if (checkUser.role == 1) {
      responseData = {
        ...responseData,
        admin: true
      }
    }
    return res.status(200).json(responseData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const userSignUp = async (req, res) => {
  const userCredentials = req.body

  try {
    let checkUser = await User.findOne({ email: userCredentials.email })
    if (checkUser) {
      return res.status(409).json({ error: 'User Already Exists' })
    } else {
      const salt = await bcrypt.genSalt(10)
      const protectedPass = await bcrypt.hash(userCredentials.password, salt)

      const createUser = await User.create({
        email: userCredentials.email,
        name: userCredentials.name,
        password: protectedPass,
        contact: userCredentials.contact,
        address: userCredentials.address
      })
      const token = generateJWT(createUser)

      res.status(201).json({
        token,
        uploader: createUser.name,
        success: 'Sucessfully Registered'
      })
    }
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

const manageUSer = (req, res) => {
  if (req.user.role === 1) {
    User.find({ role: { $ne: 1 } })
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Internal Server Error')
      })
  } else {
    res.status(401).json({ error: 'Unauthorized!' })
  }
}
const deleteUSer = (req, res) => {
  if (req.user.role === 1) {
    const userId = req.params.uid
    User.deleteOne({ _id: userId })
      .then(() => {
        res.status(200).json({ success: 'Deleted Sucessfully' })
      })
      .catch(() => res.status(500).json({ error: 'Eror in deleting user!' }))
  } else {
    res.status(401).json({ error: 'Unauthorized!' })
  }
}

export { deleteUSer, manageUSer, userLogin, userSignUp }
