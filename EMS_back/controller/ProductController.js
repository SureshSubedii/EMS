import multer from 'multer'
import Product from '../schemas/ProductSchema.js'


//Multer Configuration for Photo Uploads
const storage=multer.diskStorage({
    destination:'images',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage,

}).single("image")


const addPRoduct=async(req,res)=>{
    const productData = req.body;
    try {
      const product = await Product.create({
        name: productData.productName,
        description: productData.description,
        price: productData.price,
        category: productData.categorySelect,
        image: {
          data: req.file.filename,
          contentType: 'image/png',
        },
        uploader:productData.uploader
      });
  
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }

}

const getAllProduct=(req,res)=>{
  Product.find()
  .then(data=>res.status(200).send(data))
  .catch(err=>res.status(500).send(err))

}
const getProdPhoto = async (req, res) => {
  try {
    const prodPhoto = await Product.findById(req.params.pid).select('image');

    if (prodPhoto.image.data) {
      const base64Image = prodPhoto.image.data.toString('base64');
      const imageData = `data:${prodPhoto.image.contentType};base64,${base64Image}`;
      
      res.set('Content-Type', prodPhoto.image.contentType);
      return res.status(200).send(imageData);
    }
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).send({
      error: 'Failed to fetch photo',
    });
  }
};

export { addPRoduct, getAllProduct, getProdPhoto, upload }

