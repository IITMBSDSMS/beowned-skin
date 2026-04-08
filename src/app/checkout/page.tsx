"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutProduct");
    if (data) {
      setProduct(JSON.parse(data));
    }
  }, []);

  const price = Number(product?.price || 0);
  const gst = 0.18; // 18% GST

  const subtotal = Number((price * qty).toFixed(2));
  const gstAmount = Number((subtotal * gst).toFixed(2));
  const total = Number((subtotal + gstAmount).toFixed(2));

  const handleOrder = async () => {
    if (!product) {
      alert("No product selected");
      return;
    }

    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    }

    if (!address) {
      setAddressError("Address is required");
      valid = false;
    }

    if (!phone || phoneError) {
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Valid email required");
      valid = false;
    }

    if (!payment) {
      setPaymentError("Select payment method");
      valid = false;
    }

    if (!valid) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Create Razorpay order
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount: total }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Be-Owned Skin",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              product: product?.name,
              amount: total,
              name,
              phone,
              email,
              userId: user.id,
            }),
          });

          const result = await verifyRes.json();

          if (result.success) {
            router.push("/success");
          } else {
            alert("Payment verification failed ❌");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Something went wrong during verification");
        }
      },

      prefill: {
        name: name,
        email: email,
        contact: phone,
      },

      theme: {
        color: "#BFA37A",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-28 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900">Pre-Booking Checkout</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

            {/* LEFT - DELIVERY DETAILS */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className="md:col-span-7 space-y-12"
            >
              <div>
                <h2 className="text-lg font-medium mb-6 text-gray-900 tracking-wide uppercase">1. Delivery Details</h2>
                <div className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError(e.target.value ? "" : "Name is required");
                      }}
                      className="w-full px-5 py-4 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400 focus:outline-none transition-colors"
                    />
                    {nameError && <p className="text-red-500 text-xs mt-1.5 ml-1">{nameError}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => {
                          const value = e.target.value;
                          setEmail(value);
                          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            setEmailError("Enter valid email");
                          } else {
                            setEmailError("");
                          }
                        }}
                        className="w-full px-5 py-4 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400 focus:outline-none transition-colors"
                      />
                      {emailError && <p className="text-red-500 text-xs mt-1.5 ml-1">{emailError}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          setPhone(value);
                          if (!/^[0-9]*$/.test(value)) {
                            setPhoneError("Only numbers allowed");
                          } else if (value.length !== 10) {
                            setPhoneError("Phone must be 10 digits");
                          } else {
                            setPhoneError("");
                          }
                        }}
                        className="w-full px-5 py-4 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400 focus:outline-none transition-colors"
                      />
                      {phoneError && <p className="text-red-500 text-xs mt-1.5 ml-1">{phoneError}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Complete Delivery Address"
                      rows={3}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressError(e.target.value ? "" : "Address is required");
                      }}
                      className="w-full px-5 py-4 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400 focus:outline-none transition-colors resize-none"
                    />
                    {addressError && <p className="text-red-500 text-xs mt-1.5 ml-1">{addressError}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-6 text-gray-900 tracking-wide uppercase">2. Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 text-gray-400 font-light text-sm p-4 rounded-xl border border-gray-100 bg-gray-50 cursor-not-allowed">
                    <input type="radio" disabled /> <span>Cash on Delivery (Unavailable)</span>
                  </label>

                  <label className="flex items-center gap-4 text-gray-900 font-medium text-sm p-4 rounded-xl border border-accent/30 bg-accent/5 cursor-pointer hover:bg-accent/10 transition">
                    <input type="radio" name="payment" value="UPI" onChange={(e)=>{setPayment(e.target.value); setPaymentError("");}} className="accent-accent w-4 h-4" /> 
                    <span>UPI / Online Payment (Razorpay)</span>
                  </label>

                  <label className="flex items-center gap-4 text-gray-400 font-light text-sm p-4 rounded-xl border border-gray-100 bg-gray-50 cursor-not-allowed">
                    <input type="radio" disabled /> <span>Debit / Credit Card (Coming soon)</span>
                  </label>
                </div>
                {paymentError && <p className="text-red-500 text-xs mt-2 ml-1">{paymentError}</p>}
              </div>
            </motion.div>

            {/* RIGHT - ORDER SUMMARY */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="md:col-span-5"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sticky top-32">
                <h2 className="text-lg font-medium mb-8 text-gray-900 tracking-wide uppercase">Order Summary</h2>

                {product ? (
                  <div className="flex gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="w-20 h-24 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                       <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">₹{product.price}</p>
                      
                      {/* Quantity Minimal Modifier */}
                      <div className="flex items-center gap-4 w-min border border-gray-300 rounded-full px-2 py-1">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-500 hover:text-black w-6 text-center text-lg">−</button>
                        <span className="text-sm font-medium w-4 text-center">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="text-gray-500 hover:text-black w-6 text-center text-lg">+</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center border-b border-gray-200 mb-8 border-dashed">
                      <p className="text-gray-400 text-sm font-light">Loading product...</p>
                  </div>
                )}

                <div className="space-y-4 text-sm font-light text-gray-600 border-b border-gray-200 pb-8 mb-8">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-accent">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (GST 18%)</span>
                    <span>₹{gstAmount.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-lg text-gray-900 mb-8">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>

                {/* Desktop Button */}
                <button
                  onClick={handleOrder}
                  disabled={!product}
                  className={`hidden md:flex w-full py-4 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition shadow-lg hover:shadow-xl ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="text-sm font-medium tracking-widest uppercase">Confirm Pre-Booking</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mobile Sticky Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
            <button
              onClick={handleOrder}
              disabled={!product}
              className={`w-full py-4 text-sm font-medium tracking-widest uppercase rounded-full bg-black text-white shadow-xl active:scale-95 transition ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Pre-Book • ₹{total.toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}