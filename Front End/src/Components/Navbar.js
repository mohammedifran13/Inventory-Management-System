import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const reduxEmail = useSelector(state => state.email);
  const dispatch=useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarLinkClick = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8181/api/v1/auth/email"
        );
        const userDetails = response.data;
        console.log(userDetails);
        dispatch({type:"SET_DETAILS",payload:userDetails});
        if (userDetails) {
          const loggedInUserDetails = userDetails.find(
            user1 => user1.email === reduxEmail
          );
          if (loggedInUserDetails) {
            setLoggedInUser(loggedInUserDetails);
          }
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProfileData();
  }, [reduxEmail]);

  return (
    <div>
      <nav className="navbar">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/home" className="navbar-logo">
          Inventory Management
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/addproducts">AddProducts</Link>
          </li>
          <li>
            <Link to="/billing">Billing</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <BsArrowLeft />
        </button>
        <div className="sidebar-content">
          <h1 style={{ paddingLeft: '30px', color: 'black'}}>Inventory</h1>
          {loggedInUser ? (
            <p>Hello {loggedInUser.name}</p>
          ):(<p>Hello Guest</p>)}
          
        
          <Link to="/support" onClick={handleSidebarLinkClick}>
            Support
          </Link>
          <Link to="/" onClick={handleSidebarLinkClick}>
            Sign off
            <div className="logging-bar">
              <FiLogOut />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;