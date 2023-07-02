import axios from 'axios';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addProducts.css';
import PhotoUpload from './PhotoUpload.js';

function AddProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ref1 = useRef();

  const onAdd = async (data) => {
    try {
      const response = await axios.post('http://192.168.18.177:5000/addProduct', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const fetchedResults = response.data;

      if (fetchedResults?.error) {
        alert(fetchedResults.error);
      }
    } catch (err) {
      alert(err);
    }
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

        <select ref={ref1} name='categorySelect' {...register('categorySelect', { required: 'Category is required!' })} className='credential'>
          <option value='others' disabled defaultValue>
            Select a category
          </option>
          <option value='clothing'>Clothing</option>
          <option value='electronics'>Electronics</option>
          <option value='furniture'>Furniture</option>
          <option value='utensils'>Utensils</option>
          <option value='others'>Others</option>
        </select>

        <div className='photoComponent'>
          <PhotoUpload />
        </div>

        <div className='form_buttons'>
          <input type='submit' value='Add Product' />
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
