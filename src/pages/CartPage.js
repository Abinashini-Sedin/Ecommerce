import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import "./CartPage.css";

const CartPage = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = total * 0.1;
  const finalTotal = total + gst;

  if (items.length === 0) {
      return (
        <div className="empty-cart-message">
          <h2>Your cart is empty</h2>
        </div>
      );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-items-list">
        {items.map(item => (
          <div key={item.id} className="cart-item-row">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h4 className="cart-item-title">{item.title}</h4>
              <p className="cart-item-price">₹{item.price} each</p>
            </div>
            
            <div className="cart-item-controls">
                <label>Qty:</label>
                <input 
                    type="number" 
                    min="1" 
                    max={item.stock} 
                    value={item.quantity} 
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                    className="cart-qty-input"
                />
            </div>
            
            <div className="cart-item-subtotal">
                ₹{(item.price * item.quantity).toFixed(2)}
            </div>

            <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="remove-item-btn"
            >
                Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary-section">
          <div className="cart-summary-row">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
              <span>GST (10%):</span>
              <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="cart-summary-total">
              <span>Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn">
              Proceed to Checkout
          </button>
      </div>
    </div>
  );
};

export default CartPage;