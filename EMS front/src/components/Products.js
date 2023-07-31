import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AddCart } from '../stateManagement/userSlice';

import { useNavigate } from 'react-router-dom';
import '../styles/products.css';
import Spinner from './Spinner';
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();


const handleClick=(products)=>{
  let productDetails=JSON.stringify(products)
  sessionStorage.setItem('productDetails',productDetails)
  navigate("/productDetails")

}
  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://192.168.18.177:5000/api/v1/product/getAllProducts');
      setProducts(response.data);
      setLoading(false)

    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false)

    }
  }

  const handleAddToCart = async (e,name, price, description, pid, category,) => {
    e.stopPropagation()


    const userId = sessionStorage.getItem("userId")
    try {
      const formData = new FormData();
      formData.append('name', name)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('userId', userId)
      formData.append('pid', pid)
      formData.append('category', category)



      const response = await axios.post('http://192.168.18.177:5000/api/v1/product/addToCart', formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const fetchedResults = response.data;
      toast.success(fetchedResults.success)
      dispatch(AddCart());


    } catch (err) {
      console.log('Error fetching products:', err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    }
  }


  useEffect(() => {
    getProducts();

    
  
  }, []);

  let filteredProducts = products;
  if (searchData) {
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchData.toLowerCase())
    })
    console.log(filteredProducts)
  }

  return (
    <>
  
      <h1  className="product_header" align="center">
      
  PRODUCTS</h1>

      {loading && <div className="loader">
        <Spinner />
        please wait...

      </div>}
      
      {!loading && <div className="searchBar">
        <SearchIcon/>
        <input value={searchData} onChange={(e) => setSearchData(e.target.value)} placeholder='Search Products' />
      </div>}

      {searchData && <p align="center" className='results'>{filteredProducts.length} results found!</p>}

      <div className='products'>



        {filteredProducts?.map((product) => {
          return (
            <div className="items" key={product._id} onClick={()=>handleClick(product)}>
              <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
              <div className="product_details">
                <h2>{product.name.slice(0, 15)} {product.name[15] ? "..." : ""}</h2>
                <h3>Rs.{product.price}</h3>
                <button onClick={(e) => handleAddToCart(e,product.name, product.price, product.description, product._id, product.category)}>Add to cart</button>
              </div>


            </div>
          );
        })}
      </div>
      </>

  );
}

export default Products;
