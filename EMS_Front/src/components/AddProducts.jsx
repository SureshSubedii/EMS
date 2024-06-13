import axios from "../axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/addProducts.css";
import "../styles/photoUpload.css";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { checkUser } from "../stateManagement/userSlice";
import { useSelector } from "react-redux";

function AddProducts() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(checkUser)


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const toggle = (cpath, i) => {
    const selectedElement = document.querySelector(".selected");
    sessionStorage.setItem("selectedItemIndex", i);
    if (selectedElement) {
      selectedElement.classList.remove("selected");
    }
    document.querySelectorAll(".sidebar_items")[i]?.classList.add("selected");
    navigate(`/${cpath}`);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const onAdd = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("categorySelect", data.categorySelect);
      formData.append("image", data.product_image[0]);
      formData.append("uploader", sessionStorage.getItem("uploader"));

      const response = await axios.post(
        "product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": user
          },
        }
      );

      const fetchedResults = response.data;
      if (fetchedResults?.message) {
        toast.success(fetchedResults.message);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
    }
    toggle("", 0);
    setLoading(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const uploadedImageURL = URL.createObjectURL(file);
    setUploadedImage(uploadedImageURL);
    setValue("product_image", [file]); // Update the value of 'product_image' in the form data
  };

  return (
    <div className="addProducts">
      <h2>Add products</h2>
      <form onSubmit={handleSubmit(onAdd)}>
        <input
          name="productName"
          className="credential"
          placeholder="Product name"
          type="text"
          {...register("productName", {
            required: "Product name is required!",
          })}
        />
        {errors.productName && <p>{errors.productName.message}</p>}

        <input
          name="price"
          className="credential"
          placeholder="Enter price"
          type="number"
          {...register("price", { required: "Price is required!" })}
        />
        {errors.price && <p>{errors.price.message}</p>}

        <textarea
          name="description"
          className="credential"
          placeholder="Describe the product"
          {...register("description", { required: "Description is required!" })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <input
          name="stock"
          className="credential"
          placeholder="Enter the stock quantity"
          type="number"
          {...register("stock", { required: "Stock is required!" })}
        />
        {errors.stock && <p>{errors.stock.message}</p>}

        <select
          name="categorySelect"
          className="credential"
          {...register("categorySelect")}
        >
          <option value="others" disabled selected defaultValue>
            Select a category
          </option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="utensils">Utensils</option>
          <option value="others">Others</option>
        </select>

        <div className="photoComponent">
          <div className="photo_upload">
            <input
              type="file"
              name="product_image"
              accept="image/*"
              onChange={onFileChange}
              {...register("product_image")}
            />
            {errors.product_image && <p>{errors.product_image.message}</p>}

            {uploadedImage && (
              <div className="uploaded_photo">
                <img name="image" src={uploadedImage} alt="No image" />
              </div>
            )}
          </div>
        </div>

        <div className="form_buttons">
          <input type="submit" value="Add Product" />
        </div>
      </form>
      {loading && (
        <div className="loader">
          <Spinner />
          please wait...
        </div>
      )}
    </div>
  );
}

export default AddProducts;
