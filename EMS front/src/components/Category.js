import React from 'react';
import '../styles/category.css';
import Spinner from './Spinner';

function Category({ products, loading }) {
  // const [product,setProduct]=useState([])
  // useEffect(()=>{
  //   try{
  //     const response =  axios.get('http://192.168.18.177:5000/api/v1/product/getAllProducts');
  //     console.log(response.data)
  //   setProduct(response.data)
  // }
  // catch(err){
  //   toast.error("Error fetchinf data")
  // }


  // },[])
  // useEffect(()=>{
  //   console.log(products)

  // },[])
  return (
    <>
    <h1 className="category_header" align="center">
      CATEGORIES</h1>
      
      <div className="category">

        <div className="clothing">
          {loading ? (<div className="loader">
            <Spinner />
            please wait...

          </div>) :
            (
              <><h2>Clothing</h2><div className="items_container">
                {products?.map((prod) => (
                  prod.category==='clothing'?
                 ( <div className="clothing_items">
                    <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${prod._id}`} alt={prod.name} />
                    <h2>{prod.name.slice(0, 15)} {prod.name[15] ? "..." : ""}</h2>
                    <h3>Rs.{prod.price}</h3>
                  </div>):
                  ''

                ))}
              </div></>
              
            )}




        </div>
      </div>
      </>
  )
}

export default Category