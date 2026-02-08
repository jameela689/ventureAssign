import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]); // Array of item objects
  const [orders, setOrders] = useState([]); // Array of order IDs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('jwt_token')

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchItems();
    fetchCart();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/items');
    
      if (response.data.success) {
        setItems(response.data.items);
      }
    } catch (err) {
      setError('Failed to load items.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3001/carts', authHeader);
      console.log("res.data.cart=",res,res.data.cart)
      setCart(res.data.cart);
    } catch (err) {
      console.error('Cart fetch failed', err);
    }
  };

  // --- Logic Handlers ---

//   const addToCart = (item) => {
//     setCart([...cart, { cart_id: Date.now(), ...item }]);
//   };

  const addToCart = async (itemId) => {
    try {
      const payload = { items: [{ item_id: itemId, quantity: 1 }] };
      const res = await axios.post('http://localhost:3001/carts', payload, authHeader);
      console.log("update cart = ",res.data.cart)
      setCart(res.data.cart);
      alert('Item added to cart!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add item');
    }
  };

  const showCartItems = () => {
    if (!cart || cart.length === 0) return alert("Your cart is empty!");
    const cartDetails = cart.items.map(i => `CartID: ${i.cart_id}, ItemID: ${i.id}`).join('\n');
    alert(`--- Cart Items ---\n${cartDetails}`);
  };

//   const showOrderHistory = () => {
//     if (orders.length === 0) return alert("No orders placed yet.");
//     alert(`--- Order History ---\nOrder IDs: ${orders.join(', ')}`);
//   };

const showOrderHistory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/orders', authHeader);
      const orders = res.data.orders;
      if (!orders.length) return alert("No orders found.");
      const info = orders.map(o => `Order #${o.id} - $${o.total_amount} (${o.status})`).join('\n');
      alert(`--- Order History ---\n${info}`);
    } catch (err) {
      alert("Could not fetch orders.");
    }
  };

//   const handleCheckout = () => {
//     if (cart.length === 0) return alert("Add items to cart before checking out!");
    
//     const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
//     setOrders([...orders, newOrderId]);
//     setCart([]); // Clear cart
//     alert(`Order successful! Order ID: ${newOrderId}`);
//   };
const handleCheckout = async () => {
    if (!cart) return alert("Nothing to checkout");
    try {
      await axios.post('http://localhost:3001/orders', { cart_id: cart.id }, authHeader);
      alert('Order successful!');
      setCart(null); // Clear local cart state
      fetchItems(); // Refresh stock levels
    } catch (err) {
      alert(err.response?.data?.error || 'Checkout failed');
    }
  };
  const handleLogout = () => {
      
      alert("Logged out successfully!");
}

  if (loading) return <div className="status-message">Loading items...</div>;

  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">ShopLocal</div>
        <div className="nav-links">
          <button onClick={showOrderHistory} className="nav-btn">Orders</button>
          <button onClick={showCartItems} className="nav-btn">
            Cart <span className="cart-badge">{cart?.items?.length || 0}</span>
          </button>
          {/* <button onClick={handleLogout} className="nav-btn logout">Logout</button> */}
        </div>
      </nav>

      {/* Action Header */}
      <div className="action-bar">
        <button onClick={handleCheckout} className="btn-checkout">Checkout Now</button>
        <div className="secondary-actions">
          <button onClick={showCartItems} className="btn-secondary">View Cart</button>
          <button onClick={showOrderHistory} className="btn-secondary">Order History</button>
        </div>
      </div>

      {error && <div className="status-message error">{error}</div>}

      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card" onClick={() => addToCart(item.id)}>
            <div className="card-body">
              <h2 className="item-name">{item.name}</h2>
              <p className="item-description">{item.description}</p>
              <div className="item-meta">
                <span className="item-price">${item.price}</span>
                <span className="item-stock">{item.stock} in stock</span>
              </div>
              <div className="card-actions">
                <button className="add-to-cart-btn">Add to cart</button>
              </div>
            </div>
            {/* <div className="card-footer">
              Added on {new Date(item.created_at).toLocaleDateString()}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;