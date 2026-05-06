import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchQuery, setCategory, setViewMode, loadMore } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ProductList = () => {
  const dispatch = useDispatch();
  const { 
      displayedItems, 
      loading, 
      error, 
      categories, 
      selectedCategory, 
      viewMode,
      filteredItems
  } = useSelector(state => state.products);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const sentinelRef = useInfiniteScroll(() => {
      dispatch(loadMore());
  });

  const hasMore = displayedItems.length < filteredItems.length;

  if (loading && displayedItems.length === 0) return <div style={{ padding: 20, textAlign: "center" }}><h2>Loading products...</h2></div>;
  if (error) return <div style={{ padding: 20, color: "red", textAlign: "center" }}><h2>{error}</h2></div>;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginBottom: 20, alignItems: "center", backgroundColor: "#f8f9fa", padding: 15, borderRadius: 8 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "10px 15px", borderRadius: 4, border: "1px solid #ccc", fontSize: 16 }}
        />
        
        <select 
            value={selectedCategory} 
            onChange={(e) => dispatch(setCategory(e.target.value))}
            style={{ padding: "10px 15px", borderRadius: 4, border: "1px solid #ccc", fontSize: 16 }}
        >
            {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>

        <div style={{ display: "flex", gap: 10 }}>
            <button 
                onClick={() => dispatch(setViewMode("grid"))}
                style={{ 
                    padding: "10px 15px", 
                    backgroundColor: viewMode === "grid" ? "#007bff" : "#fff", 
                    color: viewMode === "grid" ? "#fff" : "#333",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    cursor: "pointer"
                }}
            >
                Grid
            </button>
            <button 
                onClick={() => dispatch(setViewMode("list"))}
                style={{ 
                    padding: "10px 15px", 
                    backgroundColor: viewMode === "list" ? "#007bff" : "#fff", 
                    color: viewMode === "list" ? "#fff" : "#333",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    cursor: "pointer"
                }}
            >
                List
            </button>
        </div>
      </div>

      {displayedItems.length === 0 && !loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
              <h3>No products found matching your criteria.</h3>
          </div>
      ) : (
          <div style={{ 
            display: viewMode === "grid" ? "grid" : "flex", 
            flexDirection: "column",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: 20 
          }}>
            {displayedItems.map((p, index) => (
              <div key={p.id} ref={index === displayedItems.length - 1 ? sentinelRef : null}>
                  <ProductCard product={p} />
              </div>
            ))}
          </div>
      )}
      
      {hasMore && (
          <div style={{ textAlign: "center", padding: 20, marginTop: 20, color: "#666" }}>
              Loading more products...
          </div>
      )}
    </div>
  );
};

export default ProductList;