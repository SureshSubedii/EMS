import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productDetails.css";

function ProductsDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [randomValue, setRandom] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    let parsedProduct = JSON.parse(sessionStorage.getItem("productDetails"));
    setProductDetails(parsedProduct);
    setRandom(Math.random() * 3 + 2);
    console.log("random", randomValue);
  }, []);
  return (
    <div className="show_product_details">
      <p className="back" onClick={() => navigate(-1)}>
        &larr;
      </p>

      <img
                src={`${import.meta.env.VITE_REACT_APP_BASE_URL}product/getProductPhoto/${productDetails._id}`}
                alt={productDetails.name}
      />

      <p className="title">{productDetails.name}</p>

      <p className="price">Rs.{productDetails.price}</p>

      <p className="description">{productDetails.description}.</p>

      <p className="categories">Category: {productDetails.category}</p>


      <p className="rating">
        Ratings: <Rating value={randomValue} readOnly /> {"("}
        {randomValue.toFixed(1)}
        {")"}
      </p>
      <p className="stock">Stock: {productDetails.stock}</p>

      <p className="uploader">Product By: {productDetails.username}</p>


    </div>
  );
}

export default ProductsDetails;
