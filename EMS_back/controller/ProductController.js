import fs from 'fs';
import Cart from '../schemas/CartSchema.js';
import Product from '../schemas/ProductSchema.js';

const addProduct = async (req, res) => {
  console.log(req.fields.productName);

  const productData = req.fields;
  try {
    const product = new Product({
      name: productData.productName,
      description: productData.description,
      price: productData.price,
      category: productData.categorySelect,
      uploader: productData.uploader,
      photo: {
        data: fs.readFileSync(req.files.image.path),
        contentType: req.files.image.type,
      },
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully' });
  }
   catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};


const getAllProducts = (req, res) => {
  Product.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};

const getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select('photo');

    if (product.photo && product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Failed to fetch product photo',
    });
  }
};

const addToCart=(req,res)=>{
  const {name,id,description,price}=req.body
  console.log(req.body.name)
  const cart =new Cart({
    ...req.body

  })
  cart.save().then(()=>{
    res.json({"success":"Added to cart"})
  })
  .catch(err=>res.status(500).json({"Error":"Internal Server Error"}))
  }



export { addProduct, addToCart, getAllProducts, getProductPhoto };

