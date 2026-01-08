import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";


const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";
  
  const [filters, setFilters] = useState({
      search: initialQuery,
      category: '',
      minPrice: 0,
      maxPrice: 50000,
      minRating: 0,
      minDiscount: 0,
      isAssured: false,
      availability: '',
      sort: 'relevance'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Sync search term from URL if changed via Navbar
      const query = new URLSearchParams(location.search).get("q") || "";
      if (query !== filters.search) {
          setFilters(prev => ({ ...prev, search: query }));
      }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
            search: filters.search,
            category: filters.category,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            minRating: filters.minRating,
            minDiscount: filters.minDiscount,
            isAssured: filters.isAssured,
            availability: filters.availability,
            sort: filters.sort
        };
        
        // Clean undefined/empty params
        Object.keys(params).forEach(key => {
            if (params[key] === '' || params[key] === 0 || params[key] === undefined || params[key] === false) {
                 if (key !== 'minPrice' && key !== 'isAssured') { 
                     // Allow minPrice 0, check specific keys
                     if (key === 'minRating' && params[key] === 0) delete params[key];
                     if (key === 'minDiscount' && params[key] === 0) delete params[key];
                     if (key === 'category' && params[key] === '') delete params[key];
                     if (key === 'search' && params[key] === '') delete params[key];
                     if (key === 'availability' && params[key] === '') delete params[key];
                 }
                 if (key === 'isAssured' && params[key] === false) delete params[key];
            }
        });

        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/products", { params });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div style={{ display: 'flex', backgroundColor: '#f1f3f6', minHeight: '100vh', padding: '10px' }}>
      <div style={{ width: '270px', marginRight: '10px' }}>
         <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>
      
      <div style={{ flex: 1, backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display:'flex', flexDirection:'column', gap:'10px' }}>
            <div style={{fontSize: '16px', fontWeight: '500'}}>
                 {filters.search ? `Showing results for "${filters.search}"` : 'All Products'}
                 <span style={{color: '#878787', fontSize: '14px', marginLeft: '10px'}}>
                    (Showing {products.length} products)
                 </span>
            </div>
            
            <div className="sort-strip" style={{display:'flex', gap:'20px', fontSize:'14px', color:'#212121'}}>
                <span style={{fontWeight:'bold'}}>Sort By</span>
                {['relevance', 'price_asc', 'price_desc', 'newest'].map(item => (
                    <span 
                        key={item} 
                        onClick={() => setFilters(prev => ({...prev, sort: item}))}
                        style={{
                            cursor:'pointer', 
                            color: filters.sort === item ? '#2874f0' : '#212121', 
                            fontWeight: filters.sort === item ? '600' : '400',
                            borderBottom: filters.sort === item ? '2px solid #2874f0' : 'none',
                            paddingBottom: '4px'
                        }}
                    >
                        {item === 'price_asc' ? 'Price -- Low to High' : item === 'price_desc' ? 'Price -- High to Low' : item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                ))}
            </div>
        </div>
        

        
        {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                 <Loader /> 
             </div>
        ) : products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No Results" style={{maxHeight:'200px'}}/>
                <div style={{ fontSize: '18px', marginTop: '10px', fontWeight: '600' }}>Sorry, no results found!</div>
                <div style={{ color: '#878787', marginTop: '10px' }}>Please check the spelling or try searching for something else</div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
