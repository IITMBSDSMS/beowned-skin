"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
        color: "#6366f1",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#f3f4f6] to-[#e0e7ff] px-4 md:px-8 pt-10 pb-28 md:py-16">
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600" fill="none">
        <circle cx="150" cy="150" r="200" fill="#c7d2fe" />
        <circle cx="700" cy="400" r="250" fill="#fbcfe8" />
      </svg>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

        {/* LEFT - PRODUCT */}
        <div className="bg-white/90 backdrop-blur-lg p-4 md:p-6 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Order</h2>

          <div className="flex items-center gap-4 mb-6">
            {product && (
              <>
                <img src={product.image} className="w-24" />
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-[#374151] font-medium">₹{product.price}</p>
                </div>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 justify-between max-w-[160px]">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 active:scale-95 transition"
            >-</button>
            <span className="text-lg font-semibold text-gray-900">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 active:scale-95 transition"
            >+</button>
          </div>
        </div>

        {/* RIGHT - BILL */}
        <div className="bg-white/90 backdrop-blur-lg p-4 md:p-6 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Invoice</h2>

          <div className="space-y-3 text-[#374151]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gstAmount.toFixed(0)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-indigo-600">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>

          {/* USER DETAILS */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-gray-900">Delivery Details</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(e.target.value ? "" : "Name is required");
                }}
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl bg-white/80 backdrop-blur focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-[#6B7280] focus:outline-none"
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setPhone(value);

                  // validation: only digits & 10 length
                  if (!/^[0-9]*$/.test(value)) {
                    setPhoneError("Only numbers allowed");
                  } else if (value.length !== 10) {
                    setPhoneError("Phone must be 10 digits");
                  } else {
                    setPhoneError("");
                  }
                }}
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl bg-white/80 backdrop-blur focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-[#6B7280] focus:outline-none"
              />
              {phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}

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
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl bg-white/80 backdrop-blur focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-[#6B7280] focus:outline-none"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}

              <textarea
                placeholder="Address"
                rows={3}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddressError(e.target.value ? "" : "Address is required");
                }}
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl bg-white/80 backdrop-blur focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-[#6B7280] focus:outline-none"
              />
              {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
            </div>
          </div>

          {/* PAYMENT */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-gray-900">Payment Method</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-3 text-gray-400 font-medium p-3 rounded-lg bg-gray-100 cursor-not-allowed">
                <input type="radio" disabled /> Cash on Delivery (Not available)
              </label>

              <label className="flex items-center gap-3 text-gray-800 font-medium p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer active:scale-95">
                <input type="radio" name="payment" value="UPI" onChange={(e)=>{setPayment(e.target.value); setPaymentError("");}} /> UPI / Online
              </label>

              <label className="flex items-center gap-3 text-gray-400 font-medium p-3 rounded-lg bg-gray-100 cursor-not-allowed">
                <input type="radio" disabled /> Debit / Credit Card (Coming soon)
              </label>
            </div>
            {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}
          </div>

          {/* Desktop Button */}
          <button
            onClick={handleOrder}
            disabled={!product}
            className={`hidden md:block mt-6 w-full py-3 rounded-xl shadow-md bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] shadow-lg text-white hover:shadow-xl hover:scale-[1.02] active:scale-95 transition duration-300 ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Place Order
          </button>

          {/* Mobile Sticky Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t p-4 md:hidden">
            <button
              onClick={handleOrder}
              disabled={!product}
              className={`w-full py-4 text-lg rounded-xl bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-lg active:scale-95 transition ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Place Order ₹{total.toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}