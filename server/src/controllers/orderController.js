import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import User from "../models/User.js"; 
import { sendOrderConfirmationEmail } from "../services/emailService.js";

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const userEmail = req.user.email; // Assuming req.user contains email from authentication middleware
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

  // Send Email (Async, don't block response)
  const user = await User.findByPk(userId);
  if (user) {
      sendOrderConfirmationEmail(user.email, {
          orderId: order.id,
          totalAmount: total,
          items: cart.CartItems,
          address
      }).catch(err => console.error("Email send failed", err));
  }

  res.json({ message: "Order placed", orderId: order.id });
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
