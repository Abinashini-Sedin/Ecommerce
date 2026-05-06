import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchQuery, setCategory, setViewMode, loadMore } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import "./ProductList.css";

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

  if (loading && displayedItems.length === 0) return (
    <div className="loading-products">
      <h2>Loading products...</h2>
    </div>
  );
  
  if (error) return (
    <div className="error-msg">
      <h2>{error}</h2>
    </div>
  );

  return (
    <div className="product-list-page">
      <div className="product-filters-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input-field"
        />
        
        <select 
            value={selectedCategory} 
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="category-select-field"
        >
            {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>

        <div className="view-toggle-group">
            <button 
                onClick={() => dispatch(setViewMode("grid"))}
                className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
            >
                Grid
            </button>
            <button 
                onClick={() => dispatch(setViewMode("list"))}
                className={`view-mode-btn ${viewMode === "list" ? "active" : ""}`}
            >
                List
            </button>
        </div>
      </div>

      {displayedItems.length === 0 && !loading ? (
          <div className="no-results-msg">
              <h3>No products found matching your criteria.</h3>
          </div>
      ) : (
          <div className={`products-container ${viewMode === "grid" ? "grid-view" : "list-view"}`}>
            {displayedItems.map((p, index) => (
              <div key={p.id} ref={index === displayedItems.length - 1 ? sentinelRef : null}>
                  <ProductCard product={p} />
              </div>
            ))}
          </div>
      )}
      
      {hasMore && (
          <div className="loading-more-msg">
              Loading more products...
          </div>
      )}
    </div>
  );
};

export default ProductList;