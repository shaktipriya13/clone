import React, { useState } from 'react';
import '../styles/FilterSidebar.css';
import { FaStar, FaChevronDown, FaAngleLeft } from 'react-icons/fa';

const FilterSidebar = ({ filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState(filters.maxPrice || 50000);

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
  };
  
  const handleRatingChange = (rating) => {
      setFilters(prev => ({ ...prev, minRating: rating === filters.minRating ? 0 : rating }));
  };

  const handleDiscountChange = (discount) => {
      setFilters(prev => ({ ...prev, minDiscount: discount === filters.minDiscount ? 0 : discount }));
  };

  const clearFilters = () => {
      setFilters({
          category: '',
          minPrice: 0,
          maxPrice: 50000,
          minRating: 0,
          minDiscount: 0,
          isAssured: false,
          availability: '',
          sort: 'relevance'
      });
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <span>Filters</span>
        <span className="clear-btn" onClick={clearFilters}>CLEAR ALL</span>
      </div>

      <div className="filter-section">
        <div className="filter-title">PICK A CATEGORY</div>
        <div className="category-list">
             <div
                onClick={() => setFilters(prev => ({...prev, category: ''}))}
                className={`category-item ${!filters.category ? 'active' : ''}`}
                >
                <span>All Categories &gt;</span>
                </div>

             {['Food Products', 'Home Improvement', 'Beauty and Grooming', 'Clothing and Accessories', 'Mobiles & Accessories', 'Health Care', 'Books', 'Watches', 'Audio & Video', 'Kitchen, Cookware & Serveware', 'Toys and Games'].map(cat => (
                 <div 
                    key={cat}
                    onClick={() => setFilters(prev => ({...prev, category: cat}))} 
                    className={`category-item ${filters.category === cat ? 'active' : ''}`}
                 >
                    <span>{cat}  &gt;</span>
                 </div>
             ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header-section" style={{display:'flex', justifyContent:'space-between', alignItems:'left', marginBottom:'10px'}}>
             <div className="filter-title" style={{marginBottom:0}}>PRICE</div>
             <div 
                style={{color:'#2874f0', fontSize:'12px', fontWeight:'600', cursor:'pointer'}}
                onClick={() => setFilters(prev => ({...prev, minPrice: 0, maxPrice: 50000}))}
             >
                 CLEAR
             </div>
        </div>
        <div className="price-slider-container">
            <input 
                type="range" 
                min="0" 
                max="50000" 
                step="500"
                value={filters.maxPrice || 50000}
                onChange={(e) => setFilters(prev => ({...prev, maxPrice: Number(e.target.value)}))}
                className="price-slider"
            />
            <div className="price-input-row">
                <div className="price-dropdown">
                    <select 
                        value={filters.minPrice || 0} 
                        onChange={(e) => setFilters(prev => ({...prev, minPrice: Number(e.target.value)}))}
                    >
                        <option value="0">Min</option>
                        <option value="500">₹500</option>
                        <option value="1000">₹1000</option>
                        <option value="2000">₹2000</option>
                        <option value="5000">₹5000</option>
                    </select>
                </div>
                <div className="price-to">to</div>
                <div className="price-dropdown">
                    <select 
                        value={filters.maxPrice || 50000} 
                        onChange={(e) => setFilters(prev => ({...prev, maxPrice: Number(e.target.value)}))}
                    >
                        <option value="500">₹500</option>
                        <option value="1000">₹1000</option>
                        <option value="2000">₹2000</option>
                        <option value="5000">₹5000</option>
                        <option value="10000">₹10000</option>
                        <option value="20000">₹20000</option>
                        <option value="50000">₹50000+</option>
                    </select>
                </div>
            </div>
        </div>
      </div>

       <div className="filter-section">
        <div className="filter-title-row">
            <input 
                type="checkbox" 
                id="assured-check"
                checked={filters.isAssured || false} 
                onChange={(e) => setFilters(prev => ({...prev, isAssured: e.target.checked}))}
            />
            <label htmlFor="assured-check" className="filter-title" style={{marginLeft:'10px', cursor:'pointer'}}>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" height="21" />
            </label>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-title">CUSTOMER RATINGS</div>
        <div className="rating-filter">
            {[4, 3, 2].map(rating => (
                <div key={rating} className="rating-checkbox" onClick={() => handleRatingChange(rating)}>
                    <input 
                        type="checkbox" 
                        checked={filters.minRating === rating}
                        readOnly
                    />
                    <span className="rating-label">{rating}★ & above</span>
                </div>
            ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-title">DISCOUNT</div>
        <div className="rating-filter">
            {[10, 20, 30, 50].map(disc => (
                <div key={disc} className="rating-checkbox" onClick={() => handleDiscountChange(disc)}>
                    <input 
                        type="checkbox" 
                        checked={filters.minDiscount === disc}
                        readOnly
                    />
                    <span className="rating-label">{disc}% or more</span>
                </div>
            ))}
        </div>
      </div>
      
      <div className="filter-section">
        <div className="filter-title">AVAILABILITY</div>
        <div className="rating-filter">
             <div className="rating-checkbox" onClick={() => setFilters(prev => ({...prev, availability: 'In Stock'}))}>
                <input type="checkbox" checked={filters.availability === 'In Stock'} readOnly />
                <span className="rating-label">In Stock</span>
             </div>
             <div className="rating-checkbox" onClick={() => setFilters(prev => ({...prev, availability: 'Out of Stock'}))}>
                <input type="checkbox" checked={filters.availability === 'Out of Stock'} readOnly />
                <span className="rating-label">Out of Stock</span>
             </div>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
