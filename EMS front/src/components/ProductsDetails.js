import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/productDetails.css';

function ProductsDetails() {
    const [productDetails, setProductDetails] = useState({});
    const [randomValue, setRandom] = useState(2);


    useEffect(() => {
        let parsedProduct = JSON.parse(sessionStorage.getItem("productDetails"))
        setProductDetails(parsedProduct)
        setRandom(Math.random() * 3 + 2)
        console.log("random", randomValue)



    }, [])
    return (
        <div className='product_details'>
            <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${productDetails._id}`} alt={productDetails.name} />

            <p className="title">
                {productDetails.name}

            </p>
            <p className="price">
                Rs.{productDetails.price}
            </p>
            <p className="description">
                {productDetails.description}.
            </p>

            <p className="category">
                Category: {productDetails.category}
            </p>

            <p className="rating">
                Ratings:  <Rating value={randomValue} readOnly /> {'('}{(randomValue.toFixed(1))}{')'}
            </p>

        </div>
    )
}

export default ProductsDetails