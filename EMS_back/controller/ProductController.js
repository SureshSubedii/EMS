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
export { addPRoduct, upload }
