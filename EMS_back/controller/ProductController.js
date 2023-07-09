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
const getProdPhoto= async(req,res)=>{
  try {
    // console.log(req.params.pid)
    const prodPhoto = await Product.findById(req.params.pid).select('image');

    if (prodPhoto.image.data) {
        res.set('Content-type', prodPhoto.image.contentType);
        return res.status(200).send(prodPhoto.image.data)
    }

} catch (error) {
    res.status(500).send({
        success: false,
        message: "photo fetch unsuccess",
    })
}
}
export { addPRoduct, getAllProduct, getProdPhoto, upload }

