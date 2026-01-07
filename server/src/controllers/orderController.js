import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  const userId = 1;
  const { address } = req.body;

  const cart = await Cart.findOne({
    where: { userId },
    include: [{ model: CartItem, include: [Product] }],
  });

  if (!cart || cart.CartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;
  cart.CartItems.forEach((item) => {
    total += item.quantity * item.Product.price;
  });

  const order = await Order.create({
    userId,
    total_amount: total,
    address,
  });

  const orderItems = cart.CartItems.map((item) => ({
    orderId: order.id,
    productId: item.Product.id,
    price: item.Product.price,
    quantity: item.quantity,
  }));

  await OrderItem.bulkCreate(orderItems);

  await CartItem.destroy({ where: { cartId: cart.id } });

  res.json({ message: "Order placed", orderId: order.id });
};
