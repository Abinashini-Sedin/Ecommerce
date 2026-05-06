import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

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
      return <div style={{ padding: 40, textAlign: "center" }}><h2>Your cart is empty</h2></div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Shopping Cart</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 15, marginBottom: 30 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 20, padding: 15, borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}>
            <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
              <p style={{ margin: 0, color: "#666" }}>₹{item.price} each</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <label>Qty:</label>
                <input 
                    type="number" 
                    min="1" 
                    max={item.stock} 
                    value={item.quantity} 
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                    style={{ width: 60, padding: 5 }}
                />
            </div>
            
            <div style={{ width: 100, textAlign: "right", fontWeight: "bold" }}>
                ₹{(item.price * item.quantity).toFixed(2)}
            </div>

            <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
            >
                Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "2px solid #333", paddingTop: 20, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: 300, marginBottom: 10 }}>
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 300, marginBottom: 10 }}>
              <span>GST (10%):</span>
              <span>₹{gst.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 300, marginBottom: 20, fontSize: 20, fontWeight: "bold" }}>
              <span>Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
          </div>
          
          <button style={{ padding: "12px 30px", backgroundColor: "#007bff", color: "white", fontSize: 18, border: "none", borderRadius: 4, cursor: "pointer" }}>
              Proceed to Checkout
          </button>
      </div>
    </div>
  );
};

export default CartPage;