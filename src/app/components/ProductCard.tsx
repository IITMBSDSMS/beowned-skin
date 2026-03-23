export default function ProductCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <img
        src="/images/product.png"
        alt="product"
        className="mb-4"
      />
      <h2 className="text-lg">Niacinamide 10%</h2>
      <p className="text-sm text-gray-500 mb-2">
        Controls oil & improves skin texture
      </p>
      <button className="mt-2 w-full bg-[#BFA37A] text-white py-2 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}