import "../styles/Footer.css";

const footerData = [
  {
    title: "MOST SEARCHED FOR ON FLIPKART",
    items: [
      "End of Season Sale",
      "Christmas Sale",
      "New Year Sale",
      "Motorola Edge 70",
      "Ray-Ban Meta Smart Glasses",
      "Motorola g67 Power 5G",
      "Wedding Sale",
      "Lehenga",
      "Google Pixel 10 Pro Fold",
      "iPhone 17",
      "iPhone Air",
      "vivo v60e",
      "iPhone 17 Pro Max",
      "Samsung Galaxy Z Flip 5G",
      "REDMI Note 14 SE 5G",
      "Men's Watch",
      "Women's Watch",
      "Nothing Phone 3",
      "Airpods",
      "JBL Soundbars",
      "Bose Soundbars",
      "Oneplus Wireless Earphones",
      "Samsung Galaxy S25 Ultra",
      "iPhone 16 Pro",
      "5G Mobile Phones",
      "Track Orders",
      "Manage Orders",
    ],
  },
  {
    title: "MOBILES",
    items: [
      "Infinix SMART 10",
      "OPPO Reno 14 Pro",
      "Motorola g64 5G",
      "Realme 12+ 5G",
      "Samsung Galaxy S24 5G",
      "Apple 5G Phone",
      "Oneplus 5G Phones",
      "Vivo 5G Phones",
      "4G Mobile",
      "Nokia Mobile",
      "Samsung Mobile",
      "Apple Mobile",
    ],
  },
  {
    title: "CAMERA",
    items: [
      "GoPro Action Camera",
      "Nikon Camera",
      "Canon Camera",
      "Sony Camera",
      "Canon DSLR",
      "Nikon DSLR",
    ],
  },
  {
    title: "LAPTOPS",
    items: [
      "Asus ROG Ally",
      "MacBook Pro M2",
      "Premium Laptop",
      "ASUS ROG Strix SCAR 16",
      "ASUS Zenbook 14 OLED",
      "Microsoft Surface Go",
      "Apple Laptops",
      "Dell Laptops",
      "HP Laptops",
      "Samsung Laptops",
    ],
  },
  {
    title: "CLOTHING",
    items: [
      "Sarees",
      "Men's Jeans",
      "Tops",
      "Men Footwear",
      "Designer Blouses",
      "Women's Ethnic Wear",
      "T-Shirts",
      "Men's Blazer",
      "Dresses",
      "Kurtis",
      "Salwar Suits",
      "Leggings",
      "Ethnic Wear",
    ],
  },
  {
    title: "FOOTWEAR",
    items: [
      "Adidas Shoes",
      "Reebok Shoes",
      "Nike Shoes",
      "Puma Shoes",
      "Bata Shoes",
      "Crocs",
      "Sneakers",
      "Women's Boots",
      "Sports Shoes",
      "Formal Shoes",
      "School Shoes",
    ],
  },
  {
    title: "GROCERIES",
    items: [
      "PhonePe Grocery Voucher",
      "Hand Wash",
      "Soap",
      "Cashew Nuts",
      "Sunflower Oil",
      "Eggs",
      "Toilet Cleaner",
      "Dettol Soap",
      "Mustard Oil",
      "Biscuits",
      "Cheese",
      "Tea",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-heading">Top Stories : Brand Directory</h3>

      {footerData.map((section, index) => (
        <div className="footer-section" key={index}>
          <span className="section-title">{section.title} :</span>
          <span className="section-items">
            {section.items.map((item, i) => (
              <span key={i} className="footer-link">
                {item}
                {i !== section.items.length - 1 && " | "}
              </span>
            ))}
          </span>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
