"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [image, setImage] = useState("");
  const [productFile, setProductFile] = useState<File | null>(null);

  const [testimonial, setTestimonial] = useState("");
  const [author, setAuthor] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const [media, setMedia] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchTestimonials();
    fetchMedia();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*");
    setTestimonials(data || []);
  };

  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*");
    setMedia(data || []);
  };

  const addMedia = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    console.log("Uploading file:", file);

    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const fileName = `${Date.now()}-${cleanName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Upload failed: " + uploadError.message);
      return;
    }

    console.log("Upload success:", uploadData);

    const { data: publicUrlData } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    if (!publicUrlData?.publicUrl) {
      alert("Failed to get public URL");
      return;
    }

    console.log("Public URL:", publicUrlData.publicUrl);

    const { error: dbError } = await supabase.from("media").insert([
      {
        image: publicUrlData.publicUrl,
        type: file.type.startsWith("video") ? "video" : "image",
      },
    ]);

    if (dbError) {
      console.error("DB error:", dbError);
      alert("Database insert failed: " + dbError.message);
      return;
    }

    alert("Upload successful 🚀");

    setFile(null);
    fetchMedia();
  };

  const deleteMedia = async (id: string) => {
    await supabase.from("media").delete().eq("id", id);
    fetchMedia();
  };

  const addProduct = async () => {
    let imageUrl = image;

    // upload file if selected
    if (productFile) {
      const cleanName = productFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const fileName = `${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, productFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const discount = Math.round(
      ((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100
    );

    await supabase.from("products").insert([
      {
        name,
        price: Number(price),
        original_price: Number(originalPrice),
        discount,
        image: imageUrl,
      },
    ]);

    setName("");
    setPrice("");
    setOriginalPrice("");
    setImage("");
    setProductFile(null);

    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const addTestimonial = async () => {
    await supabase.from("testimonials").insert([
      { name: author, message: testimonial },
    ]);

    setAuthor("");
    setTestimonial("");
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setTab("products")} className={`px-4 py-2 rounded ${tab === "products" ? "bg-indigo-500" : "bg-white/10"}`}>Products</button>
        <button onClick={() => setTab("testimonials")} className={`px-4 py-2 rounded ${tab === "testimonials" ? "bg-indigo-500" : "bg-white/10"}`}>Testimonials</button>
        <button onClick={() => setTab("media")} className={`px-4 py-2 rounded ${tab === "media" ? "bg-indigo-500" : "bg-white/10"}`}>Reels</button>
      </div>

      {/* MEDIA / REELS */}
      {tab === "media" && (
        <>
          <div className="bg-white/10 p-6 rounded-xl mb-8">
            <h2 className="mb-4">Upload Reel / Media</h2>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-4"
            />

            {file && (
              file.type.startsWith("video") ? (
                <video src={URL.createObjectURL(file)} className="w-full h-48 object-cover rounded mb-3" controls />
              ) : (
                <img src={URL.createObjectURL(file)} className="w-full h-48 object-cover rounded mb-3" />
              )
            )}

            <button
              onClick={addMedia}
              disabled={!file}
              className={`py-3 w-full rounded ${
                file
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              {file ? "Upload Reel" : "Select file first"}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {media.map((m) => (
              <div key={m.id} className="bg-white/5 p-4 rounded-xl">
                {m.type === "video" ? (
                  <video src={m.image} className="w-full h-40 object-cover rounded" controls />
                ) : (
                  <img src={m.image} className="w-full h-40 object-cover rounded" />
                )}

                <button onClick={() => deleteMedia(m.id)} className="mt-2 bg-red-500 w-full py-2 rounded">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PRODUCTS */}
      {tab === "products" && (
        <>
          <div className="bg-white/10 p-6 rounded-xl mb-8">
            <h2 className="mb-4">Add Product</h2>
            <p className="text-sm text-gray-400 mb-2">Use Image URL OR upload file</p>

            <div className="grid gap-3">
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 bg-black border border-white/20 rounded" />
              <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 bg-black border border-white/20 rounded" />
              <input placeholder="Original Price" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="p-3 bg-black border border-white/20 rounded" />
              <input
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                className="p-2 bg-black border border-white/20 rounded"
              />

              {productFile && (
                <img
                  src={URL.createObjectURL(productFile)}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <button onClick={addProduct} className="bg-gradient-to-r from-indigo-500 to-pink-500 py-3 rounded">Add Product</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white/5 p-4 rounded-xl">
                <img src={p.image} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-2">{p.name}</h3>
                <p>₹{p.price}</p>
                <p className="line-through text-gray-400">₹{p.original_price}</p>
                <button onClick={() => deleteProduct(p.id)} className="mt-2 bg-red-500 w-full py-2 rounded">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TESTIMONIALS */}
      {tab === "testimonials" && (
        <>
          <div className="bg-white/10 p-6 rounded-xl mb-8">
            <h2 className="mb-4">Add Testimonial</h2>

            <input placeholder="Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="p-3 bg-black border border-white/20 rounded w-full mb-3" />

            <textarea placeholder="Message" value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="p-3 bg-black border border-white/20 rounded w-full mb-3" />

            <button onClick={addTestimonial} className="bg-gradient-to-r from-indigo-500 to-pink-500 py-3 w-full rounded">Add</button>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 p-4 rounded">
                <p>"{t.message}"</p>
                <p className="text-gray-400">— {t.name}</p>
                <button onClick={() => deleteTestimonial(t.id)} className="mt-2 bg-red-500 px-3 py-1 rounded">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
