import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import './Products.css';
import Navbar from './Navbar';
import axios from 'axios';

const Products = () => {
  const [menProducts, setMenProducts] = useState([]);
  

  useEffect(() => {
    fetchMenProducts();
  }, []);

  const fetchMenProducts = () => {
    axios.get('http://127.0.0.1:8080/product')
      .then(response => {
        setMenProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    
  };

  

  return (
    <div>
      <Navbar  />
      <div className="menu">
      <h1 className="menuTitle">Products</h1>
      <Link to="/addproducts">
      <button className='popupClose' style={{marginLeft:"80rem",marginTop:"-60px"}} > Add Item</button>
      </Link>
        <div className="menuList">
          {menProducts.map((item, index) => (
            <div className="menuItem" key={index}>
              <div className="menuItemImg" style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }} />
              <div className='product-img-details'>
                <h2 className="menuItemName">{item.name}</h2>
                <p style={{ paddingTop:"5px",paddingBottom: "5px",color:"black",fontSize:"1.2rem",fontWeight:"bold"}} className="stock">Quantity {item.stock} KG</p>
              </div>
              <p className="menuItemPrice">Price ₹{item.price}</p>
             <button className='popupClose'>Restock</button>
                
                  
                </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Products;