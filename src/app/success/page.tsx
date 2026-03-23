"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] via-[#f3f4f6] to-[#e0e7ff] px-4 relative overflow-hidden">

      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600" fill="none">
        <circle cx="150" cy="150" r="200" fill="#c7d2fe" />
        <circle cx="700" cy="400" r="250" fill="#fbcfe8" />
      </svg>

      <div className="bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-200 relative z-10">

        {/* Animated Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping"></div>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              className="relative z-10 bg-white rounded-full p-3 shadow-md"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed 🎉
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed. We’ll notify you once it’s shipped.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-900">#BEO12345</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/profile"
            className="block w-full py-3 border border-gray-300 rounded-xl text-gray-800 hover:bg-gray-100 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}