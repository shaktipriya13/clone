import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
        items: ["All", "Men's T-Shirts", "Men's Casual Shirts", "Men's Formal Shirts", "Men's Kurtas", "Men's Ethnic Sets", "Men's Blazers", "Men's Raincoat", "Men's Windcheaters", "Men's Suit", "Men's Fabrics"],
      },
      { name: "Men's Bottom Wear", items: ["All", "Men's Jeans", "Men's Trousers", "Men's Shorts", "Track Pants"] },
      { name: "Women Ethnic", items: ["All", "Sarees", "Kurtas", "Salwar Suits", "Ethnic Gowns"] },
      { name: "Men Footwear", items: ["All", "Sports Shoes", "Casual Shoes", "Formal Shoes", "Sandals"] },
      { name: "Women Footwear", items: ["All", "Flats", "Heels", "Wedges"] },
      { name: "Watches and Accessories", items: ["All", "Watches", "Wallets", "Belts"] },
      { name: "Women Western", items: ["All", "Tops", "Dresses", "Jeans"] },
      { name: "Bags, Suitcases & Luggage", items: ["All", "Backpacks", "Suitcases", "Handbags"] },
      { name: "Kids", items: ["All", "Boys Clothing", "Girls Clothing", "Baby Care"] },
      { name: "Essentials", items: ["All", "Inners", "Sleepwear"] },
      { name: "Winter", items: ["All", "Jackets", "Sweatshirts"] },
    ],
  },
  {
    name: "Electronics",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/69c6589653afdb9a.png",
    hasMenu: true,
    subCategories: [
      {
        name: "Audio",
        items: ["All", "Bluetooth Headphones", "Wired Headphones", "True Wireless Earbuds", "Bluetooth Speakers", "Soundbars", "Home Theatres", "TV Streaming Device", "Remote Control", "DTH Set top box", "Headphones Pouch & Case Covers"],
      },
      { name: "Electronics GST Store", items: ["All Items"] },
      { name: "Cameras & Accessories", items: ["DSLR", "Mirrorless", "Action Cameras", "Lenses", "Tripods"] },
      { name: "Computer Peripherals", items: ["Printers", "Monitors", "Keyboards", "Mice"] },
      { name: "Gaming", items: ["Consoles", "Gaming Mice", "Gaming Keyboards", "Games"] },
      { name: "Health & Personal Care", items: ["Trimmers", "Hair Dryers", "Weighing Scales"] },
      { name: "Laptop Accessories", items: ["Laptop Bags", "Mousepads", "Cooling Pads"] },
      { name: "Laptop and Desktop", items: ["Laptops", "Gaming Laptops", "Desktops"] },
      { name: "MobileAccessory", items: ["Cases & Covers", "Screen Guards", "Power Banks"] },
      { name: "Powerbank", items: ["All Powerbanks"] },
      { name: "Smart Home automation", items: ["Smart Assistants", "Smart Lights", "Smart Plugs"] },
      { name: "Smart Wearables", items: ["Smart Watches", "Fitness Bands"] },
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
    subCategories: [
      {
        name: "Home Furnishings",
        items: ["All", "Bed Linens", "Bedsheets", "Blankets", "Curtains & Accessories", "Bath linen", "Floor coverings", "Covers & protectors", "Cushions & Pillows", "Kitchen Linen Sets"],
      },
      { name: "Furniture", items: ["All", "Sofas", "Beds", "Dining Tables"] },
      { name: "Living Room Furniture", items: ["All", "TV Units", "Coffee Tables"] },
      { name: "Kitchen & Dining", items: ["All", "Cookware", "Tableware"] },
      { name: "Bedroom Furniture", items: ["All", "Wardrobes", "Mattresses"] },
      { name: "Space Saving Furniture", items: ["All", "Foldable Tables", "Wall Mounts"] },
      { name: "Home Decor", items: ["All", "Wall Decor", "Clocks"] },
      { name: "Tools & Utility", items: ["All", "Power Tools", "Hand Tools"] },
      { name: "Work Space Furniture", items: ["All", "Office Chairs", "Desks"] },
      { name: "Kids Furniture", items: ["All", "Bunk Beds", "Kids Tables"] },
      { name: "Lightings & Electricals", items: ["All", "LED Bulbs", "Ceiling Lights"] },
    ],
  },
  {
    name: "Flight Bookings",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/3c647c2e0d937dc5.png?q=100",
  },
  {
    name: "Beauty, Food..",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/b3020c99672953b9.png?q=100",
    hasMenu: true,
    subCategories: [
      {
        name: "Beauty & Personal Care",
        items: ["View All", "Bath & Oral Care", "Personal Hygiene", "Eye Makeup", "Face Makeup", "Lip Makeup", "Hair Care", "Bath Essentials", "Women's Personal Hygiene", "Body & Skin Care"],
      },
      { name: "Men's Grooming", items: ["All", "Beard Care", "Face Wash", "Shaving"] },
      { name: "Food & Drinks", items: ["All", "Beverages", "Snacks", "Chocolates"] },
      { name: "Nutrition & Health Care", items: ["All", "Vitamins", "Proteins"] },
      { name: "Baby Care", items: ["All", "Diapers", "Baby Food"] },
      { name: "Toys & School Supplies", items: ["All", "Remote Control Toys", "Puzzles"] },
      { name: "Sports & Fitness", items: ["All", "Cricket", "Badminton", "Gym"] },
      { name: "Books", items: ["All", "Fiction", "Self-Help"] },
      { name: "Music", items: ["All", "Musical Instruments"] },
      { name: "Stationery & Office Supplies", items: ["All", "Pens", "Notebooks"] },
      { name: "Auto Accessories", items: ["All", "Helmets", "Car Perfumes"] },
    ],
  },
  {
    name: "Grocery",
    img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/29327f40e9c4d26b.png",
  },
];

const CategoryStrip = () => {
  const [activeSub, setActiveSub] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`category-wrapper ${!isHomePage ? 'collapsed' : ''}`}>
      <div className="category-strip">
        {categories.map((cat, index) => (
          <div 
            className="category-item" 
            key={index}
            onMouseEnter={() => setActiveSub(0)} // Reset sub-menu index on changing main category
          >
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
                      <IoChevronForward className="sub-arrow" />
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