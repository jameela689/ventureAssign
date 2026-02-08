import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './HomePage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
     
      const response = await axios.get('http://localhost:3001/items');
      
      // Accessing the .items array from your specific response object
      if (response.data.success) {
        setItems(response.data.items);
      } else {
        setError('Failed to fetch data from the server.');
      }
    } catch (err) {
      setError('An error occurred while loading items. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="status-message">Loading items...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <div className="homepage-container">
      <Navbar/>
      <header className="header">
        <h1>Product Catalog</h1>
        <p>Showing {items.length} items</p>
      </header>

      {items.length === 0 ? (
        <div className="status-message">No items available</div>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="card-body">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-description">{item.description}</p>
                
                <div className="item-meta">
                  <span className="item-price">${item.price.toLocaleString()}</span>
                  <span className={`item-stock ${item.stock < 5 ? 'low-stock' : ''}`}>
                    {item.stock} in stock
                  </span>
                </div>
                <div className="card-actions">
      <button className="add-to-cart-btn">Add to cart</button>
    </div>
              </div>
   
              {/* <div className="card-footer">
                Added on {formatDate(item.created_at)}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;