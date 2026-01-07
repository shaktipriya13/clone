import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const userId = 1; // default user (temporary)
    const { productId, quantity } = req.body;

    // 1️⃣ Ensure product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Find or create cart for user
    const [cart] = await Cart.findOrCreate({
      where: { userId },
    });

    // 3️⃣ Find or create cart item
    const [item, created] = await CartItem.findOrCreate({
      where: {
        cartId: cart.id,
        productId,
      },
      defaults: { quantity },
    });

    // 4️⃣ If item already existed, update quantity
    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    res.json({ message: "✅ Added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Failed to add to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = 1; // default user (temporary)

    const cart = await Cart.findOne({
      where: { userId }, // ✅ correct column name
      include: [
        {
          model: CartItem,
          include: [Product],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const updateQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  const item = await CartItem.findByPk(cartItemId);
  item.quantity = quantity;
  await item.save();

  res.json({ message: "Quantity updated" });
};

export const removeItem = async (req, res) => {
  const { id } = req.params;
  await CartItem.destroy({ where: { id } });
  res.json({ message: "Item removed" });
};
