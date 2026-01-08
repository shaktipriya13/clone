import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const getWishlist = async (req, res) => {
  try {
    const userId = 1; // Mock User
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [Product]
    });
    res.json(wishlist);
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = 1; // Mock User
    
    const [item, created] = await Wishlist.findOrCreate({
      where: { userId, productId }
    });

    if (created) {
        res.status(201).json({ message: "Added to Wishlist", item });
    } else {
        res.status(200).json({ message: "Already in Wishlist", item });
    }
  } catch (error) {
    console.error("Add Wishlist Error:", error);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = 1; // Mock User

    await Wishlist.destroy({
      where: { userId, productId }
    });

    res.json({ message: "Removed from Wishlist" });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};
