import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";

const seedProducts = async () => {
  // Check if products already exist to avoid duplicates on restart
  const count = await Product.count();
  if (count > 0) {
    console.log("⚠️ Products already seeded, skipping...");
    return;
  }

  const productsData = [
    // Top Deals (Electronics)
    {
      title: "Apple iPhone 14 (128GB)",
      description: "Midnight, A15 Bionic chip, 12MP Dual Camera",
      price: 58999,
      category: "Mobiles",
      section: "top_deals",
      image: "https://images.unsplash.com/photo-1695048065318-971253456722?w=300",
      stock: 50
    },
    {
      title: "Samsung Galaxy S23 5G",
      description: "Phantom Black, 8GB RAM, 128GB Storage",
      price: 64999,
      category: "Mobiles",
      section: "top_deals",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300",
      stock: 30
    },
    {
        title: "Sony WH-1000XM5",
        description: "Wireless Noise Cancelling Headphones",
        price: 24990,
        category: "Audio",
        section: "top_deals",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300",
        stock: 20
    },
    {
        title: "Apple MacBook Air M2",
        description: "13.6-inch, 8GB RAM, 256GB SSD",
        price: 92990,
        category: "Laptops",
        section: "top_deals",
        image: "https://images.unsplash.com/photo-1517336714731-489679bd1bab?w=300",
        stock: 15
    },

    // Best Quality Products (Fashion)
    {
      title: "Nike Revolution 6",
      description: "Men's Running Shoes, Comfortable & Stylish",
      price: 2499,
      category: "Fashion",
      section: "best_quality",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      stock: 100
    },
    {
      title: "Puma T-Shirt",
      description: "Cotton Regular Fit Round Neck",
      price: 599,
      category: "Fashion",
      section: "best_quality",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      stock: 200
    },
    {
        title: "Titan Karishma Analog Watch",
        description: "For Men, Champagne Dial, Gold Strap",
        price: 1995,
        category: "Fashion",
        section: "best_quality",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300",
        stock: 45
    },

    // Furniture Bestsellers
    {
        title: "Engineered Wood Side Table",
        description: "Modern side table with storage",
        price: 1890,
        category: "Furniture",
        section: "furniture_bestsellers",
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300",
        stock: 40
    },
    {
        title: "Wooden Home Temple",
        description: "Handcrafted wooden temple for home",
        price: 3499,
        category: "Furniture",
        section: "furniture_bestsellers",
        image: "https://images.unsplash.com/photo-1540932296774-70974868c2df?w=300",
        stock: 25
    },
    {
        title: "Collapsible Shoe Rack",
        description: "Metal shoe rack, 4 shelves",
        price: 899,
        category: "Furniture",
        section: "furniture_bestsellers",
        image: "https://images.unsplash.com/photo-1595515106967-4662d54cc87c?w=300",
        stock: 60
    },
    {
        title: "Fabric Wardrobe",
        description: "Portable foldable wardrobe",
        price: 1299,
        category: "Furniture",
        section: "furniture_bestsellers",
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=300",
        stock: 35
    },

    // Make Your Home Stylish
    {
        title: "Anti-Skid Door Mat",
        description: "Microfiber absorbent bath mat",
        price: 299,
        category: "Home",
        section: "home_stylish",
        image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=300",
        stock: 100
    },
    {
        title: "Chrome Finish Faucet",
        description: "Stainless steel water tap",
        price: 799,
        category: "Home",
        section: "home_stylish",
        image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=300",
        stock: 50
    },
    {
        title: "Mosquito Net for Bed",
        description: "King size mosquito net, foldable",
        price: 999,
        category: "Home",
        section: "home_stylish",
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300",
        stock: 40
    },
    {
        title: "Super Soft Blanket",
        description: "Double bed mink blanket",
        price: 1499,
        category: "Home",
        section: "home_stylish",
        image: "https://images.unsplash.com/photo-1580301762395-9c027c53711b?w=300",
        stock: 30
    },

    // Best Value Fashion
    {
        title: "Women's Cotton Top",
        description: "Casual floral print top",
        price: 499,
        category: "Fashion",
        section: "fashion_value",
        image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=300",
        stock: 150
    },
    {
        title: "Women's High Rise Jeans",
        description: "Skinny fit blue denim jeans",
        price: 899,
        category: "Fashion",
        section: "fashion_value",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300",
        stock: 80
    },
    {
        title: "Bluetooth Neckband",
        description: "Wireless earphones with mic",
        price: 699,
        category: "Audio",
        section: "fashion_value",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300",
        stock: 120
    },
    
    // Discounts For You
    {
        title: "Artificial Potted Plant",
        description: "Decorative artificial flowers",
        price: 199,
        category: "Home",
        section: "discounts",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300",
        stock: 200
    },
    {
        title: "Minimalist Wrist Watch",
        description: "Black dialect analog watch",
        price: 399,
        category: "Fashion",
        section: "discounts",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        stock: 90
    },
    
    // Top Deals Gadgets
    {
        title: "Smart Watch Series 7",
        description: "Fitness tracker, HR monitor",
        price: 1499,
        category: "Gadgets",
        section: "gadgets",
        image: "https://images.unsplash.com/photo-1579586337278-68323a275264?w=300",
        stock: 100
    },
    {
        title: "Bluetooth Speaker",
        description: "Portable mini speaker, extra bass",
        price: 799,
        category: "Audio",
        section: "gadgets",
        image: "https://images.unsplash.com/photo-1629814467772-23c013bdcedf?w=300",
        stock: 150
    }
  ];

  const products = await Product.bulkCreate(productsData, { returning: true });

  // Optional: Also populate ProductImage table if needed by existing logic, 
  // though we are mostly using 'image' field on Product now.
  // To keep schema consistent/clean, we can leave it empty or mirror data.
  // For now, relying on product.image for the UI.

  console.log("✅ Products seeded successfully with multiple sections");
};

export default seedProducts;
