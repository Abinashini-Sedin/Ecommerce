import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.products.viewMode);

    const getStockInfo = () => {
        if (product.stock > 5) return { text: "In Stock", color: "green" };
        if (product.stock > 1) return { text: "Only a few left", color: "orange" };
        if (product.stock === 1) return { text: "Only 1 left", color: "red" };
        return { text: "Unavailable", color: "gray" };
    };

    const stockInfo = getStockInfo();

    const isList = viewMode === "list";

    return (
        <div style={{ 
            border: "1px solid #ddd", 
            padding: 15, 
            borderRadius: 8, 
            display: "flex", 
            flexDirection: isList ? "row" : "column",
            gap: 15,
            alignItems: isList ? "center" : "flex-start",
            backgroundColor: "#fff"
        }}>
            <img 
                src={product.image} 
                alt={product.title} 
                style={{ 
                    width: isList ? "100px" : "100%", 
                    height: isList ? "100px" : "200px", 
                    objectFit: "contain" 
                }} 
            />
            
            <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "#333" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.title}
                    </h4>
                </Link>
                
                <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: "18px" }}>₹{product.price}</p>
                
                <p style={{ margin: "5px 0", color: stockInfo.color, fontSize: "14px", fontWeight: "bold" }}>
                    {stockInfo.text}
                </p>

                <div style={{ marginTop: "auto", paddingTop: 15 }}>
                    <button 
                        onClick={() => dispatch(addToCart(product))}
                        disabled={product.stock === 0}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: product.stock === 0 ? "#ccc" : "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: product.stock === 0 ? "not-allowed" : "pointer",
                            width: isList ? "auto" : "100%"
                        }}
                    >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;