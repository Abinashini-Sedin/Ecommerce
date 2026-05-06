import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.products.viewMode);

    const getStockInfo = () => {
        if (product.stock > 5) return { text: "In Stock", className: "green" };
        if (product.stock > 1) return { text: "Only a few left", className: "orange" };
        if (product.stock === 1) return { text: "Only 1 left", className: "red" };
        return { text: "Unavailable", className: "gray" };
    };

    const stockInfo = getStockInfo();

    const isList = viewMode === "list";

    return (
        <div className={`product-card ${isList ? "list-view" : "grid-view"}`}>
            <img 
                src={product.image} 
                alt={product.title} 
                className="product-card-image"
            />
            
            <div className="product-card-info">
                <Link to={`/product/${product.id}`} className="product-card-link">
                    <h4 className="product-card-title">
                        {product.title}
                    </h4>
                </Link>
                
                <p className="product-card-price">₹{product.price}</p>
                
                <p className={`product-card-stock ${stockInfo.className}`}>
                    {stockInfo.text}
                </p>

                <div className="product-card-actions">
                    <button 
                        onClick={() => dispatch(addToCart(product))}
                        disabled={product.stock === 0}
                        className="add-to-cart-btn"
                    >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;