import React, { useState } from "react";
import "../styles/CategoryStrip.css";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

const categories = [
  {
    name: "Minutes",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e00302d428f5c7be.png?q=100",
  },
  {
    name: "Mobiles & Tablets",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/22fddf3c7da4c4f4.png",
  },
  {
    name: "Fashion",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png",
    hasMenu: true,
    subCategories: [
      {
        name: "Men's Top Wear",
        items: [
          "All",
          "Men's T-Shirts",
          "Men's Casual Shirts",
          "Men's Formal Shirts",
          "Men's Kurtas",
        ],
      },
      {
        name: "Men's Bottom Wear",
        items: ["All", "Men's Jeans", "Men's Trousers"],
      },
      {
        name: "Women Ethnic",
        items: ["All", "Sarees", "Kurtas", "Salwar Suits"],
      },
      { name: "Men Footwear", items: ["All", "Sports Shoes", "Casual Shoes"] },
    ],
  },
  {
    name: "Electronics",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/69c6589653afdb9a.png",
    hasMenu: true,
    subCategories: [
      {
        name: "Audio",
        items: [
          "All",
          "Bluetooth Headphones",
          "Wired Headphones",
          "True Wireless Earbuds",
          "Bluetooth Speakers",
        ],
      },
      { name: "Electronics GST Store", items: ["All Items"] },
      {
        name: "Cameras & Accessories",
        items: ["DSLR", "Mirrorless", "Action Cameras"],
      },
      {
        name: "Computer Peripherals",
        items: ["Printers", "Monitors", "Keyboards"],
      },
    ],
  },
  {
    name: "TVs & Appliances",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100",
  },
  {
    name: "Home & Furniture",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/1788f177649e6991.png?q=100",
    hasMenu: true,
  },
  {
    name: "Flight Bookings",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/3c647c2e0d937dc5.png?q=100",
  },
  {
    name: "Beauty, Food..",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/b3020c99672953b9.png?q=100",
    hasMenu: true,
  },
  {
    name: "Grocery",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/29327f40e9c4d26b.png",
  },
];

const CategoryStrip = () => {
  const [activeSub, setActiveSub] = useState(0);

  return (
    <div className="category-wrapper">
      <div className="category-strip">
        {categories.map((cat, index) => (
          <div className="category-item" key={index}>
            <div className="img-box">
              <img src={cat.img} alt={cat.name} />
            </div>
            <span className="cat-label">
              {cat.name}{" "}
              {cat.hasMenu && <IoChevronDown className="cat-chevron" />}
            </span>

            {/* MEGA MENU TRIGGERED ON HOVER */}
            {cat.hasMenu && cat.subCategories && (
              <div className="mega-menu">
                <div className="mega-left">
                  {cat.subCategories.map((sub, idx) => (
                    <div
                      key={idx}
                      className={`sub-item ${
                        activeSub === idx ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveSub(idx)}
                    >
                      {sub.name}
                      {activeSub === idx && (
                        <IoChevronForward className="sub-arrow" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mega-right">
                  <div className="mega-title">
                    More in {cat.subCategories[activeSub].name}
                  </div>
                  {cat.subCategories[activeSub].items.map((item, i) => (
                    <div key={i} className="mega-link">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryStrip;
