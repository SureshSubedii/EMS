import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/addProducts.css';
import '../styles/photoUpload.css';

function AddProducts() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onAdd = async (data) => {
    try {
      const formData = new FormData();
      formData.append('productName', data.productName);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('categorySelect', data.categorySelect);
      formData.append('image', data.product_image[0]);
      formData.append('uploader', sessionStorage.getItem('uploader'))

      const response = await axios.post('http://192.168.18.177:5000/api/v1/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fetchedResults = response.data;
      if (fetchedResults.error && fetchedResults.error.message) {
        alert(fetchedResults.error.message);
      }
      else if(fetchedResults.message){
        alert(fetchedResults.message)
        navigate("/")
 

      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const uploadedImageURL = URL.createObjectURL(file);
    setUploadedImage(uploadedImageURL);
    setValue('product_image', [file]); // Update the value of 'product_image' in the form data
  };

  return (
    <div className='addProducts'>
      <h2>Add products</h2>
      <form onSubmit={handleSubmit(onAdd)}>
        <input
          name='productName'
          className='credential'
          placeholder='Product name'
          type='text'
          {...register('productName', { required: 'Product name is required!' })}
        />
        {errors.productName && <p>{errors.productName.message}</p>}

        <input
          name='price'
          className='credential'
          placeholder='Enter price'
          type='number'
          {...register('price', { required: 'Price is required!' })}
        />
        {errors.price && <p>{errors.price.message}</p>}

        <textarea
          name='description'
          className='credential'
          placeholder='Describe the product'
          {...register('description', { required: 'Description is required!' })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <select name='categorySelect' className='credential' {...register('categorySelect')}>
          <option value='others' disabled selected defaultValue>
            Select a category
          </option>
          <option value='clothing'>Clothing</option>
          <option value='electronics'>Electronics</option>
          <option value='furniture'>Furniture</option>
          <option value='utensils'>Utensils</option>
          <option value='others'>Others</option>
        </select>

        <div className='photoComponent'>
          <div className='photo_upload'>
            <input type='file' name='product_image' accept='image/*' onChange={onFileChange} />
            {uploadedImage && (
              <div className='uploaded_photo'>
                <img name='image' src={uploadedImage} alt='No image' />
              </div>
            )}
          </div>
        </div>

        <div className='form_buttons'>
          <input type='submit' value='Add Product' />
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
