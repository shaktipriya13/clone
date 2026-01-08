import React, { useEffect, useState } from "react";
import CategoryStrip from "../components/CategoryStrip";
import Carousel from "../components/Carousel";
import ProductSection from "../components/ProductSection";
import FeaturedGrid from "../components/FeaturedGrid";
import RecentlyViewed from "../components/RecentlyViewed";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner.jsx";

const Home = () => {
  return (
    <div>
      {/* <CategoryStrip /> */}
      <div className="home-content">
        <Carousel />
        <SaleBanner />

        {/* Dynamic Sections - Row 1 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "10px",
            flexWrap: "wrap",
          }}
        >
          <FeaturedGrid title="Top Selection" sectionTag="top_deals" />
          <FeaturedGrid
            title="Best Deals on Furniture"
            sectionTag="furniture_bestsellers"
          />
          <FeaturedGrid
            title="Make your home stylish"
            sectionTag="home_stylish"
          />
        </div>

        {/* Existing Horizontal Section */}
        <ProductSection
          title="Best Quality Products"
          sectionTag="best_quality"
        />

        {/* Dynamic Sections - Row 2 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "10px",
            flexWrap: "wrap",
          }}
        >
          <FeaturedGrid
            title="Best Value Deals on Fashion"
            sectionTag="fashion_value"
          />
          <FeaturedGrid title="Top Deals on Gadgets" sectionTag="gadgets" />
          <FeaturedGrid title="Discounts for You" sectionTag="discounts" />
        </div>

        <ProductSection
          title="Summer Decor & Furnishing"
          sectionTag="summer_decor"
        />

        <RecentlyViewed />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
