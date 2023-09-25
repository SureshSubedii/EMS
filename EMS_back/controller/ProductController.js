import fs from 'fs';
import Cart from '../schemas/CartSchema.js';
import Product from '../schemas/ProductSchema.js';

const addProduct = async (req, res) => {
  const productData = req.fields;
  const { image} = req.files
  try {
    const product = new Product({
      name: productData.productName,
      description: productData.description,
      price: productData.price,
      category: productData.categorySelect,
      uploader: productData.uploader
  
    });
    if(image){
      console.log(image.type)
      product.photo.data =  fs.readFileSync(image.path)
      product.photo.contentType = image.type
    }
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  }
   catch (error) {
    res.status(500).json({ error: error.message });
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

const addToCart=async (req,res)=>{
  const check= await Cart.findOne({pid:req.body.pid,userId:req.body.userId})
  if(check){
    res.json({"success":"Product is already in the cart"})
  }
  else{
    const cart =new Cart({
      ...req.body
  
    })
    cart.save().then(()=>{
      res.json({"success":"Added to cart"})
    })
    .catch(err=>res.status(500).json({"error":"Internal Server Error"}))

  }
  
  }

  const showCart=async (req,res)=>{
    try{
      const check= await Cart.find({userId:req.params.userId})
      // console.log(req.params.userId)
      if(check){
        res.send(check)
        // console.log("Here")

      }
      else{
        res.status(404).send("Nothing on the cart")
      }
    }
      catch(err){
        console.log(err)
        res.status(500).json({"error":"Internal Server Error"})
      }

    }
   



export { addProduct, addToCart, getAllProducts, getProductPhoto, showCart };

