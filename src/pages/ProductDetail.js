import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) return (
    <div className="not-found-page">
      <h2>Product not found</h2>
      <Link to="/">Go Back</Link>
    </div>
  );

  const getStockInfo = () => {
      if (product.stock > 5) return { text: "In Stock", className: "green" };
      if (product.stock > 1) return { text: "Only a few left", className: "orange" };
      if (product.stock === 1) return { text: "Only 1 left", className: "red" };
      return { text: "Unavailable", className: "gray" };
  };

  const stockInfo = getStockInfo();

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-to-products">&larr; Back to Products</Link>
      
      <div className="product-detail-card">
        <div className="detail-image-box">
            <img src={product.image} alt={product.title} className="detail-product-image" />
        </div>
        
        <div className="detail-content">
          <h2 className="detail-title">{product.title}</h2>
          <p className="detail-category-label">{product.category}</p>
          
          <div className="price-display-container">
            <p className="detail-price-text">₹{product.price}</p>
          </div>
          
          <div className="description-section">
            <h4 className="description-heading">Description</h4>
            <p className="description-body">{product.description}</p>
          </div>
          
          <div className="stock-action-card">
             <p className={`stock-status-info ${stockInfo.className}`}>
                 Stock Status: {stockInfo.text} ({product.stock} units available)
             </p>
             
             <button 
                onClick={() => dispatch(addToCart(product))}
                disabled={product.stock === 0}
                className="add-btn"
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