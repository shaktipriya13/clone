import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another provider if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Skipping email sending: EMAIL_USER or EMAIL_PASS not set in .env");
      return;
  }

  const { orderId, totalAmount, items, address } = orderDetails;

  const itemsHtml = items.map(item => `
    <div style="border-bottom: 1px solid #eee; padding: 10px 0; display: flex;">
        <img src="${item.Product.image}" alt="${item.Product.title}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px;">
        <div>
            <div style="font-weight: bold; font-size: 14px; color: #333;">${item.Product.title}</div>
            <div style="color: #777; font-size: 12px;">Qty: ${item.quantity}</div>
            <div style="font-weight: bold; margin-top: 5px;">₹${item.Product.price}</div>
        </div>
    </div>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #2874f0; padding: 15px; text-align: center;">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="Flipkart" style="height: 30px;">
        </div>
        
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #2874f0; margin-top: 0;">Order Confirmed!</h2>
            <p>Hi,</p>
            <p>Thank you for your order! We're happy to let you know that we've received your order.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 5px;">Order ID: ${orderId}</div>
                <div style="color: #555;">Delivery Address: ${address}</div>
            </div>

            <h3 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Item(s) Ordered</h3>
            ${itemsHtml}

            <div style="text-align: right; margin-top: 20px; border-top: 2px solid #f0f0f0; padding-top: 15px;">
                <div style="font-size: 16px;">Total Amount: <span style="font-weight: bold; font-size: 18px;">₹${totalAmount}</span></div>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
                This is an auto-generated email. Please do not reply to this email.
            </p>
        </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: htmlContent,
    });
    console.log(`Order confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
