import React from "react";
import { Link } from 'react-router-dom';
import "./home.css";
import Navbar from "./Navbar"; 

const Home = () => {
  return (
    <div className="quick">
    <Navbar/>
    <div className="home">
    <div className='content'>
    <h1 style={{paddingTop: "110px",color:"white"}}>Makes Order and Inventory
    Management Easy</h1>
    <div className="type" style={{color:"white"}} > 
    <h3>Discover a world of possibilities with us. From cutting-edge technology to unparalleled service, we've got you covered.
     Whether you're here to explore our products, streamline your inventory management, or seek expert advice, you're in the right place.
    </h3>
    </div>
    <Link to="/products">
    <button className='theme' style={{marginTop : "30px"}}>
    Get Started
    </button>
    </Link>
    </div>
    </div>
   
    </div>
  );
};

export default Home;