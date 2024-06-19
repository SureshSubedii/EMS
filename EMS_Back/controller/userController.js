import bcrypt from 'bcrypt'
import User from '../schemas/userSchema.js'
import { generateJWT, hashPassword } from '../helpers/authHelper.js'

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
      user: checkUser.name,
      userId: checkUser._id,
      admin: checkUser.role == 1,
      superAdmin: checkUser.role == 2
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
      const createUser = await User.create({
        email: userCredentials.email,
        name: userCredentials.name,
        password: await hashPassword(userCredentials.password),
        contact: userCredentials.contact,
        address: userCredentials.address,
        role: userCredentials.userType
      })
      const token = generateJWT(createUser)

      res.status(201).json({
        token,
        userId: createUser._id,
        user: createUser.name,
        admin: createUser.role == 1,
        success: 'Sucessfully Registered'
      })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
}

const manageUSer = (req, res) => {
  User.find({ role: { $ne: 2 } })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send('Internal Server Error')
    })
}
const deleteUser = (req, res) => {
  const userId = req.params.uid
  User.deleteOne({ _id: userId })
    .then(() => {
      res.status(200).json({ success: 'Deleted Sucessfully' })
    })
    .catch(e => res.status(500).json({ error: e.message }))
}

export { deleteUser, manageUSer, userLogin, userSignUp }
