import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addProducts.css';
import PhotoUpload from "./PhotoUpload.js";


function AddProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAdd= async (data)=>{
    try{
      const result=await fetch("http://192.168.18.177:5000/addProduct", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send form data as JSON
    })
    const responseText= await result.text();
  const fetchedResults=  await JSON.parse(responseText);
  if(fetchedResults?.error){
    alert(fetchedResults.error);
  }
 
  
  }
  catch(err){
  alert(err);
  
  }
    
  }
  
  return (
    <div className='addProducts'>
      <h2>Add products</h2>
      <form onSubmit={handleSubmit(onAdd)}>
       
        <input
          name="productName"
          className="credential"
          placeholder="Product name"
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
       
          <textarea name="description" className="credential" placeholder='Describe the product'
          {...register("description", { required: "description is required!" })}
          
          />

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