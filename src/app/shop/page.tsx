"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const requireAuth = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login?next=/shop");
      return false;
    }

    return true;
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#f3f4f6] to-[#e0e7ff] px-4 md:px-8 py-16">
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600" fill="none">
        <circle cx="150" cy="150" r="200" fill="#c7d2fe" />
        <circle cx="700" cy="400" r="250" fill="#fbcfe8" />
      </svg>
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 tracking-tight leading-tight">
          Shop Products
        </h1>
        <p className="text-[#4B5563] text-lg md:text-xl max-w-2xl">
          Discover skincare designed for real results.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-4"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[85%] snap-center bg-white/90 backdrop-blur-md rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-2xl transition duration-500 overflow-hidden hover:-translate-y-1 animate-[fadeIn_0.6s_ease]"
            >
              {/* Image */}
              <div className="h-[280px] bg-gradient-to-br from-indigo-50 to-pink-50 relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-contain transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {product.name}
                </h2>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-[#4B5563] line-through">
                    ₹{product.original_price}
                  </span>
                  <span className="text-green-600 text-sm font-semibold">
                    {Math.round(
                      ((product.original_price - product.price) /
                        product.original_price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                {/* Button */}
                <button
                  onClick={async () => {
                    const ok = await requireAuth();
                    if (!ok) return;

                    localStorage.setItem("checkoutProduct", JSON.stringify(product));
                    router.push("/checkout");
                  }}
                  className="w-full py-4 text-base bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-xl shadow-md shadow-purple-300/40 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/90 backdrop-blur-md rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-2xl transition duration-500 overflow-hidden hover:-translate-y-1 animate-[fadeIn_0.6s_ease]"
            >
              {/* Image */}
              <div className="h-[280px] bg-gradient-to-br from-indigo-50 to-pink-50 relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-contain transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-[#4B5563] line-through">
                    ₹{product.original_price}
                  </span>
                  <span className="text-green-600 text-sm font-semibold">
                    {Math.round(
                      ((product.original_price - product.price) /
                        product.original_price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                <button
                  onClick={async () => {
                    const ok = await requireAuth();
                    if (!ok) return;

                    localStorage.setItem("checkoutProduct", JSON.stringify(product));
                    router.push("/checkout");
                  }}
                  className="w-full py-4 text-base bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-xl shadow-md shadow-purple-300/40 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`}</style>
    </div>
  );
}