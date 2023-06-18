import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addProducts.css';
import PhotoUpload from "./PhotoUpload.js";


function AddProducts() {
  const onAdd=()=>{
    
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='addProducts'>
      <h2>Add products</h2>
      <form onSubmit={handleSubmit(onAdd)}>
       
        <input
          name="productName"
          className="credential"
          placeholder="Enter Product name"
          type="text"
          {...register("productName", { required: "Product name is required!" })}
        />
        {errors.productName && <p> {errors.productName.message}</p>}
      
      
        <input
          name="price"
          className="credential"
          placeholder="Enter price"
          type="number"
          {...register("price", { required: "Price is required!" })}
        />
        {errors.price && <p> {errors.price.message}</p>}
        <div className="credential">
        <PhotoUpload/>

        </div>

        


        <div className="form_buttons">
          <input type="submit" value="Add Product" />
        </div>
        
      </form>
    </div>
  )
}

export default AddProducts