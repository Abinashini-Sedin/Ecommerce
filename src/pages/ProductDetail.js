import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) return <div style={{ padding: 40, textAlign: "center" }}><h2>Product not found</h2><Link to="/">Go Back</Link></div>;

  const getStockInfo = () => {
      if (product.stock > 5) return { text: "In Stock", color: "green" };
      if (product.stock > 1) return { text: "Only a few left", color: "orange" };
      if (product.stock === 1) return { text: "Only 1 left", color: "red" };
      return { text: "Unavailable", color: "gray" };
  };

  const stockInfo = getStockInfo();

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 20, color: "#007bff", textDecoration: "none" }}>&larr; Back to Products</Link>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, backgroundColor: "#fff", padding: 30, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <img src={product.image} alt={product.title} style={{ maxWidth: "100%", maxHeight: 400, objectFit: "contain" }} />
        </div>
        
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: 24, margin: "0 0 10px 0" }}>{product.title}</h2>
          <p style={{ color: "#666", textTransform: "uppercase", fontSize: 14, letterSpacing: 1 }}>{product.category}</p>
          
          <div style={{ margin: "20px 0" }}>
            <p style={{ fontSize: 28, fontWeight: "bold", margin: 0 }}>₹{product.price}</p>
          </div>
          
          <div style={{ marginBottom: 30 }}>
            <h4 style={{ margin: "0 0 10px 0" }}>Description</h4>
            <p style={{ lineHeight: 1.6, color: "#444" }}>{product.description}</p>
          </div>
          
          <div style={{ padding: 20, backgroundColor: "#f8f9fa", borderRadius: 8 }}>
             <p style={{ margin: "0 0 15px 0", fontSize: 16, fontWeight: "bold", color: stockInfo.color }}>
                 Stock Status: {stockInfo.text} ({product.stock} units available)
             </p>
             
             <button 
                onClick={() => dispatch(addToCart(product))}
                disabled={product.stock === 0}
                style={{
                    padding: "12px 24px",
                    backgroundColor: product.stock === 0 ? "#ccc" : "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    fontSize: 18,
                    width: "100%"
                }}
             >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;