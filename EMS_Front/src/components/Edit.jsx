import React, { useState, useEffect } from 'react';
import '../styles/edit.css';
import axios from '../axios';
import { toast } from 'react-toastify';

function Edit({ setEdit, product }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);

  const handleClose = (e) => {
    e.stopPropagation();
    setEdit(0);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleUpdate = async (id) => {
    console.log(name, description, price, category)
    const {data} =  await axios.put("product/update", {
      id, name, description, price, category

    })
    setEdit(0);
    const success = data.success ? 'success' : 'error';

    toast[success](data.message, {
      onClose: () => {
        success === "success"? window.location.reload() : "";
      },
    });
    
  };

  useEffect(() => {}, []); 

  return (
    <div id="edit" onClick={(e) => handleClose(e)}>
      <form className="edit-form" onClick={(e) => handleClick(e)}>
        <h1>Edit Form</h1>
        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="furniture">Furniture</option>
          <option value="others">Others</option>
          <option value="utensils">Utensils</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">electronics</option>
        </select>
        <div className="action">
          <div id="submit" onClick={() => handleUpdate(product._id)}>
            Update
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
