import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const items = useSelector(state => state.cart.items);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 30px",
            backgroundColor: "#232f3e",
            color: "white"
        }}>
            <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 24, fontWeight: "bold" }}>
                E-Commerce Browser
            </Link>

            <Link to="/cart" style={{ color: "white", textDecoration: "none", fontSize: 18, display: "flex", alignItems: "center", gap: 10 }}>
                <span>Cart </span>
                {count > 0 && (
                    <span style={{
                        backgroundColor: "#f0c14b",
                        color: "#111",
                        padding: "2px 8px",
                        borderRadius: 12,
                        fontWeight: "bold",
                        fontSize: 14
                    }}>
                        {count}
                    </span>
                )}
            </Link>
        </nav>
    );
};

export default Navbar;