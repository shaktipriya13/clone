import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";

const seedProducts = async () => {
  const products = await Product.bulkCreate(
    [
      {
        title: "iPhone 14",
        description: "Apple iPhone 14 with A15 chip",
        price: 69999,
        category: "Mobiles",
        stock: 10,
      },
      {
        title: "Samsung Galaxy S23",
        description: "Flagship Samsung phone",
        price: 74999,
        category: "Mobiles",
        stock: 15,
      },
    ],
    { returning: true }
  );

  await ProductImage.bulkCreate([
    {
      productId: products[0].id,
      image_url: "https://via.placeholder.com/300",
    },
    {
      productId: products[1].id,
      image_url: "https://via.placeholder.com/300",
    },
  ]);

  console.log("✅ Products seeded successfully");
};

export default seedProducts;
