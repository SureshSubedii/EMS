import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { adminCheck, checkUser } from "../stateManagement/userSlice";
import "../styles/appcontents.css";
import AddProducts from "./AddProducts";
import Cart from "./Cart";
import Category from "./Category";
import Products from "./Products";
import ProductsDetails from "./ProductsDetails";
import UserManagement from "./UsersManagement";
import { useCallback } from "react";

function Appcontents() {
  const admin = useSelector(adminCheck);
  const user = useSelector(checkUser)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedGetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("product/getAllProducts", {
        headers: {
          "Authorization": user
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
  
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
    }
  }, []);
  
  useEffect(() => {
    debouncedGetProducts();
  }, []);

  return (
    <>
      <div className="appcontents">
        <Routes>
          <Route
            path="*"
            element={<Products loading={loading} products={products} />}
          />
          <Route path="/addProduct" element={<AddProducts />} />
          {admin && (
            <Route path="/userManagement" element={<UserManagement />} />
          )}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/category"
            element={<Category loading={loading} products={products} />}
          />
          <Route path="productDetails" element={<ProductsDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default Appcontents;
