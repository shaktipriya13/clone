import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products?search=${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="search-results-container">
       <div className="search-header">
           Results for "{query}"
       </div>
       {loading ? (
           <div>Loading...</div>
       ) : (
           <div className="search-grid">
               {products.length > 0 ? (
                   products.map(product => (
                       <div key={product.id} className="search-grid-item">
                           <ProductCard product={product} />
                       </div>
                   ))
               ) : (
                   <div className="no-results">
                       <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="No Results" style={{width: 200}}/>
                       <h3>No products found for "{query}"</h3>
                   </div>
               )}
           </div>
       )}
    </div>
  );
};

export default SearchResults;
