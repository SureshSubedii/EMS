import fs from 'fs'
import Cart from '../schemas/cartSchema.js'
import Product from '../schemas/productSchema.js'
import mongoose from 'mongoose'

const addProduct = async (req, res) => {
  const productData = req.fields
  const { image } = req.files
  try {
    const product = new Product({
      name: productData.productName,
      description: productData.description,
      price: productData.price,
      category: productData.categorySelect,
      uploader: productData.uploader,
      stock: productData.stock
    })
    if (image) {
      product.photo.data = fs.readFileSync(image.path)
      product.photo.contentType = image.type
    }
    await product.save()
    res.status(201).json({ message: 'Product added successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllProducts = (req, res) => {
  Product.aggregate([
    {
      $lookup: {
        from:'users',
        localField:'uploader',
        foreignField: '_id',
        as: 'userDetails'

      }
    },
    {
      $unwind: '$userDetails'
    },
    {
      $addFields: {
        username: '$userDetails.name'
      }
    },{
      $project: {
        userDetails: 0 ,
        photo:0

      }
    }
  ])
    .then(products => {
      res.status(200).send(products)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message })
    })
}

const getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select('photo')

    if (product.photo && product.photo.data) {
      res.set('Content-Type', product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    res.status(500).send({
      error: 'Failed to fetch product photo'
    })
  }
}

const addToCart = async (req, res) => {
  const check = await Cart.findOne({
    pid: req.body.pid,
    userId: req.body.userId
  })
  if (check) {
    res.json({ success: 'Product is already in the cart' })
  } else {
    const cart = new Cart({
      ...req.body
    })
    cart
      .save()
      .then(() => {
        res.json({ success: 'Added to cart' })
      })
      .catch(err => res.status(500).json({ error: 'Internal Server Error' }))
  }
}

const showCart = async (req, res) => {
  try {
    const check = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'pid',
          foreignField: '_id',
          as: 'productData'
        }
      },
      {
        $unwind: '$productData'
      },
      {
        $project: {
          name: 1,
          price: 1,
          pid: 1,
          userId: 1,
          stock: '$productData.stock'
        }
      },
      {
        $match: {
          userId: { $eq: new mongoose.Types.ObjectId(req.params.userId) }
        }
      }
    ])
    if (check) {
      res.send(check)
    } else {
      res.status(404).json({ error: 'Nothing on the cart' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteProduct = async (req, res) => {
  Product.deleteOne({ _id: req.params.pid })
    .then(() =>
      res.status(200).json({ success: 'Product deleted successfully' })
    )
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}

const updateProduct = async (req, res) => {
  const { id, name, description, price, category, stock } = req.body
  try {
    const product = await Product.findById(id)
    if (req.user.role != 2 && product.uploader != req.user._id) {
      throw new Error('Access Denied!')
    }

    product.name = name
    product.description = description
    product.price = price
    product.category = category
    product.stock = stock

    await product.save()

    res
      .status(200)
      .json({ success: true, message: 'Product updated successfully' })
  } catch (error) {
    res.status(401).json({ success: false, message: error.message })
  }
}

const removeCart = async(req, res)=>{
  const {cartId} =  req.body

  await Cart.deleteOne({_id: cartId })
  res.status(200).json({success: true})

}

export {
  addProduct,
  addToCart,
  getAllProducts,
  getProductPhoto,
  showCart,
  deleteProduct,
  updateProduct,
  removeCart
}
