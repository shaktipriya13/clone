import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [activeStep, setActiveStep] = useState(2); // 1: Login, 2: Address, 3: Summary, 4: Payment
  const [paymentOption, setPaymentOption] = useState('COD');
  const navigate = useNavigate();

  const addresses = [
    {
      id: 1,
      name: "Shakti Priya",
      phone: "9263335772",
      address: "Dhanbad, Jharkhand - 834003",
      type: "HOME"
    },
    {
      id: 2,
      name: "Shakti Priya",
      phone: "92633357XX",
      address: "Khelgaon, Ranchi, Jharkhand - 835217",
      type: "WORK"
    },
    {
      id: 3,
      name: "Neeraj Kumar",
      phone: "8709633XXX",
      address: "Navi Mumbai, Maharashtra PIN 400705, Navi Mumbai, Maharashtra - 400705",
      type: "HOME"
    }
  ];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/cart");
        setCartItems(response.data.CartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.Product.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();
  const mrp = totalAmount * 1.25;
  const discount = mrp - totalAmount;

  const handleDeliverHere = () => {
      setActiveStep(3);
  };

  const handleContinue = () => {
      setActiveStep(4);
  };

  const handleConfirmOrder = () => {
     
      toast.success("Order Placed Successfully!", {
          position: "top-center",
          autoClose: 2000,
      });
      setTimeout(() => {
          navigate("/order-confirmed", { state: { orderId: 'OD' + Date.now(), totalAmount } });
      }, 2000);
  };

  const handlePay = () => {
    // Simulating payment process
    toast.info("Redirecting to Payment Gateway...", { position: "top-center", autoClose: 1000 });
    setTimeout(() => {
         handleConfirmOrder();
    }, 1500);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-left">
          
          {/* Step 1: Login */}
          <div className="checkout-step completed">
            <div className="step-number">1</div>
            <div className="step-content-wrapper">
                <div className="step-header">
                    <span className="step-title">LOGIN</span>
                    <span className="step-check">✓</span>
                </div>
                <div className="step-preview">
                    <span className="user-contact">+919263335772</span>
                </div>
            </div>
            <button className="change-btn-plain">CHANGE</button>
          </div>

          {/* Step 2: Address */}
          {activeStep === 2 ? (
              <div className="checkout-step active">
                <div className="step-header-active">
                    <div className="step-number-active">2</div>
                    <span className="step-title-active">DELIVERY ADDRESS</span>
                </div>
                
                <div className="address-list">
                    {addresses.map((addr) => (
                        <div key={addr.id} className={`address-item ${selectedAddress === addr.id ? 'selected' : ''}`} onClick={() => setSelectedAddress(addr.id)}>
                            <div className="address-header">
                                <input type="radio" checked={selectedAddress === addr.id} readOnly />
                                <span className="addr-name">{addr.name}</span>
                                <span className="addr-type">{addr.type}</span>
                                <span className="addr-phone">{addr.phone}</span>
                            </div>
                            <div className="address-text">
                                {addr.address}
                            </div>
                            {selectedAddress === addr.id && (
                                <button className="deliver-here-btn" onClick={handleDeliverHere}>DELIVER HERE</button>
                            )}
                             {selectedAddress === addr.id && (
                                 <button className="edit-btn">EDIT</button>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="add-address-row">
                     <span className="plus-icon">+</span>
                     <span>Add a new address</span>
                </div>
              </div>
          ) : (
             <div className="checkout-step completed">
                <div className="step-number">2</div>
                <div className="step-content-wrapper">
                    <div className="step-header">
                        <span className="step-title">DELIVERY ADDRESS</span>
                        {activeStep > 2 && <span className="step-check">✓</span>}
                    </div>
                     {activeStep > 2 && <div className="step-preview">{addresses.find(a=>a.id===selectedAddress)?.name} - {addresses.find(a=>a.id===selectedAddress)?.address.substring(0,30)}...</div>} 
                </div>
                 {activeStep > 2 && <button className="change-btn-plain" onClick={() => setActiveStep(2)}>CHANGE</button>}
             </div>
          )}


          {/* Step 3: Order Summary */}
          {activeStep === 3 ? (
             <div className="checkout-step active">
                <div className="step-header-active">
                    <div className="step-number-active">3</div>
                    <span className="step-title-active">ORDER SUMMARY</span>
                </div>
                <div className="order-summary-content">
                    {cartItems.map(item => (
                         <div key={item.id} className="order-summary-item">
                             <div className="item-image-container">
                                 <img src={item.Product.image} alt={item.Product.title} />
                             </div>
                             <div className="item-details">
                                 <div className="item-title">{item.Product.title}</div>
                                 <div className="seller-info">Seller: RetailNet</div>
                                 <div className="price-row">
                                     <span className="current-price">₹{item.Product.price}</span>
                                     <span className="original-price">₹{(item.Product.price * 1.25).toFixed(0)}</span>
                                     <span className="discount-info">20% Off</span>
                                     <span className="offers-info">1 offer applied</span> 
                                 </div>
                               
                             </div>
                              <div className="delivery-info">
                                 Delivery by {new Date(Date.now() + 3*24*60*60*1000).toDateString().slice(0, 10)} | <span style={{color:'#388e3c'}}>Free</span> <span style={{textDecoration:'line-through', color:'#878787'}}>₹40</span>
                            </div>
                         </div>
                    ))}
                    <div className="order-summary-footer">
                        <div className="confirmation-email-text">
                            Order confirmation email will be sent to <span className="user-email">shaktipriya@gmail.com</span>
                        </div>
                        <button className="continue-btn" onClick={handleContinue}>CONTINUE</button>
                    </div>
                </div>
             </div>
          ) : (
            <div className="checkout-step disabled">
                <div className="step-number">3</div>
                <div className="step-content-wrapper">
                     <span className="step-title">ORDER SUMMARY</span>
                     {activeStep > 3 && <span className="step-check" style={{marginLeft:'10px'}}>✓</span>}
                     {activeStep > 3 && <div className="step-preview">{cartItems.length} Products</div>}
                </div>
                {activeStep > 3 && <button className="change-btn-plain" onClick={() => setActiveStep(3)}>CHANGE</button>}
            </div>
          )}
          

           {/* Step 4: Payment */}
           {activeStep === 4 ? (
             <div className="checkout-step active">
                 <div className="step-header-active">
                    <div className="step-number-active">4</div>
                    <span className="step-title-active">PAYMENT OPTIONS</span>
                </div>
                <div className="payment-options-list">
                    {/* UPI */}
                    <div className={`payment-option ${paymentOption === 'UPI' ? 'selected' : ''}`} onClick={() => setPaymentOption('UPI')}>
                        <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'UPI'} readOnly />
                            <span className="payment-label">UPI</span>
                        </div>
                        {paymentOption === 'UPI' && (
                             <div className="payment-content">
                                 <div className="payment-instruction">Choose an option</div>
                                 <div className="payment-sub-options">
                                     <div className="sub-option-item">
                                         <input type="radio" name="upiOptions" id="upi_id" defaultChecked />
                                         <label htmlFor="upi_id" className="sub-option-label">Your UPI ID</label>
                                     </div>
                                     <div style={{marginLeft:'26px'}}>
                                         <input type="text" className="payment-text-input" placeholder="e.g. mobileNumber@upi" />
                                         <button className="pay-now-btn" onClick={handlePay}>PAY ₹{totalAmount}</button>
                                     </div>
                                     
                                     <div className="sub-option-item">
                                         <input type="radio" name="upiOptions" id="upi_phonepe" />
                                         <label htmlFor="upi_phonepe" className="sub-option-label">PhonePe</label>
                                     </div>
                                     <div className="sub-option-item">
                                         <input type="radio" name="upiOptions" id="upi_gpay" />
                                         <label htmlFor="upi_gpay" className="sub-option-label">Google Pay</label>
                                     </div>
                                 </div>
                             </div>
                        )}
                    </div>

                     {/* Wallets */}
                    <div className={`payment-option ${paymentOption === 'WALLETS' ? 'selected' : ''}`} onClick={() => setPaymentOption('WALLETS')}>
                        <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'WALLETS'} readOnly />
                            <span className="payment-label">Wallets</span>
                        </div>
                         {paymentOption === 'WALLETS' && (
                             <div className="payment-content">
                                 <div className="payment-sub-options">
                                     <div className="sub-option-item">
                                         <input type="radio" name="walletOptions" id="wallet_phonepe" defaultChecked />
                                         <label htmlFor="wallet_phonepe" className="sub-option-label">PhonePe Wallet</label>
                                     </div>
                                      <div className="sub-option-item">
                                         <input type="radio" name="walletOptions" id="wallet_paytm" />
                                         <label htmlFor="wallet_paytm" className="sub-option-label">Paytm Wallet</label>
                                     </div>
                                      <button className="pay-now-btn" onClick={handlePay}>PAY ₹{totalAmount}</button>
                                 </div>
                             </div>
                        )}
                    </div>

                    {/* Credit / Debit / ATM Card */}
                    <div className={`payment-option ${paymentOption === 'CARD' ? 'selected' : ''}`} onClick={() => setPaymentOption('CARD')}>
                         <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'CARD'} readOnly />
                            <span className="payment-label">Credit / Debit / ATM Card</span>
                        </div>
                         {paymentOption === 'CARD' && (
                             <div className="payment-content">
                                 <div className="card-form">
                                     <input type="text" className="payment-text-input" placeholder="Enter Card Number" />
                                     <div className="card-row">
                                         <div className="card-input-group">
                                             <input type="text" className="payment-text-input" placeholder="Valid Thru (MM/YY)" />
                                         </div>
                                         <div className="card-input-group">
                                             <input type="text" className="payment-text-input" placeholder="CVV" />
                                         </div>
                                     </div>
                                      <button className="pay-now-btn" onClick={handlePay}>PAY ₹{totalAmount}</button>
                                 </div>
                             </div>
                        )}
                    </div>

                    {/* Net Banking */}
                    <div className={`payment-option ${paymentOption === 'NET_BANKING' ? 'selected' : ''}`} onClick={() => setPaymentOption('NET_BANKING')}>
                        <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'NET_BANKING'} readOnly />
                            <span className="payment-label">Net Banking</span>
                        </div>
                         {paymentOption === 'NET_BANKING' && (
                             <div className="payment-content">
                                  <div className="payment-instruction">Popular Banks</div>
                                  <div className="payment-sub-options" style={{flexDirection:'row', flexWrap:'wrap', gap:'20px', marginBottom:'16px'}}>
                                     <div className="sub-option-item">
                                         <input type="radio" name="bankOptions" id="bank_hdfc" />
                                         <span className="sub-option-label">HDFC Bank</span>
                                     </div>
                                     <div className="sub-option-item">
                                         <input type="radio" name="bankOptions" id="bank_icici" />
                                         <span className="sub-option-label">ICICI Bank</span>
                                     </div>
                                     <div className="sub-option-item">
                                         <input type="radio" name="bankOptions" id="bank_sbi" />
                                         <span className="sub-option-label">State Bank of India</span>
                                     </div>
                                     <div className="sub-option-item">
                                         <input type="radio" name="bankOptions" id="bank_axis" />
                                         <span className="sub-option-label">Axis Bank</span>
                                     </div>
                                  </div>
                                  <div className="payment-instruction">Other Banks</div>
                                  <select className="bank-select">
                                      <option>-- Select Bank --</option>
                                      <option>Bank of Baroda</option>
                                      <option>Kotak Mahindra Bank</option>
                                      <option>Punjab National Bank</option>
                                      <option>Union Bank of India</option>
                                  </select>
                                   <div style={{marginTop:'10px'}}>
                                     <button className="pay-now-btn" onClick={handlePay}>PAY ₹{totalAmount}</button>
                                   </div>
                             </div>
                        )}
                    </div>
                    
                    {/* COD */}
                    <div className={`payment-option ${paymentOption === 'COD' ? 'selected' : ''}`} onClick={() => setPaymentOption('COD')}>
                        <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'COD'} readOnly />
                            <span className="payment-label">Cash on Delivery</span>
                        </div>
                         {paymentOption === 'COD' && (
                             <div className="payment-content">
                                 <div className="payment-instruction" style={{ marginTop: 0, marginBottom: '20px' }}>
                                    <span style={{fontSize:'12px', background:'#f0f0f0', padding:'2px 6px', borderRadius:'2px', color:'#212121', marginLeft:'0px'}}>Uncheck for Online Payment</span>
                                 </div>
                                 <button className="confirm-order-btn" onClick={handleConfirmOrder}>CONFIRM ORDER</button>
                             </div>
                        )}
                    </div>

                     {/* EMI */}
                    <div className={`payment-option ${paymentOption === 'EMI' ? 'selected' : ''}`} onClick={() => setPaymentOption('EMI')}>
                         <div className="payment-header-row">
                            <input type="radio" checked={paymentOption === 'EMI'} readOnly />
                            <span className="payment-label">EMI (Easy Installments)</span>
                        </div>
                         {paymentOption === 'EMI' && (
                             <div className="payment-content">
                                  <div className="payment-instruction">No EMI plans available</div>
                             </div>
                        )}
                    </div>
                </div>
             </div>
           ) : (
             <div className="checkout-step disabled">
                 <div className="step-number">4</div>
                 <div className="step-title">PAYMENT OPTIONS</div>
            </div>
           )}

        </div>

        <div className="checkout-right">
             <div className="price-details-card">
            <div className="price-header">PRICE DETAILS</div>
            <div className="price-body">
              <div className="price-row">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{mrp.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span className="discount-text">– ₹{discount.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span className="free-text">Free</span>
              </div>
              <div className="total-row">
                <span>Total Payable</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="savings-message">
                Your Total Savings on this order ₹{discount.toFixed(0)}
              </div>
            </div>
          </div>
          
           <div className="safe-payment-strip" style={{marginTop: '20px'}}>
             <div className="shield-icon">🛡️</div>
             <div>Safe and Secure Payments. Easy returns. 100% Authentic products.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
