"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

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

    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const fileName = `${Date.now()}-${cleanName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    if (!publicUrlData?.publicUrl) return;

    const { error: dbError } = await supabase.from("media").insert([
      {
        image: publicUrlData.publicUrl,
        type: file.type.startsWith("video") ? "video" : "image",
      },
    ]);

    if (dbError) {
      alert("Database insert failed: " + dbError.message);
      return;
    }

    setFile(null);
    fetchMedia();
  };

  const deleteMedia = async (id: string) => {
    await supabase.from("media").delete().eq("id", id);
    fetchMedia();
  };

  const addProduct = async () => {
    let imageUrl = image;

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
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 font-sans selection:bg-accent/30 selection:text-white pb-20">
      
      {/* Top Bar Area */}
      <header className="px-8 md:px-12 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0E0E0E]">
         <div>
            <h1 className="text-sm text-gray-500 uppercase tracking-[0.2em] font-medium mb-1">Backstage</h1>
            <p className="text-3xl text-white font-light tracking-tight">Admin System</p>
         </div>

         {/* Minimal Tabs */}
         <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
           {["products", "testimonials", "media"].map(t => (
             <button
               key={t}
               onClick={() => setTab(t)}
               className={`px-5 py-2.5 rounded-lg text-sm tracking-wide capitalize transition-all duration-300 ${
                 tab === t ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"
               }`}
             >
               {t === "products" ? "Pre-Booking Items" : t}
             </button>
           ))}
         </div>
      </header>

      {/* Content Canvas */}
      <div className="p-8 md:p-12 max-w-7xl mx-auto">
         <motion.div 
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
         >
            {/* MEDIA / REELS */}
            {tab === "media" && (
              <div className="space-y-12">
                <section className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                  <h2 className="text-lg text-white font-medium mb-6">Import New Asset</h2>
                  <div className="max-w-xl space-y-4">
                     <div className="relative group">
                        <input
                           type="file"
                           accept="image/*,video/*"
                           onChange={(e) => setFile(e.target.files?.[0] || null)}
                           className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                        />
                     </div>
                     {file && (
                       <div className="mt-4 border border-white/10 rounded-xl overflow-hidden bg-black max-h-[300px] flex items-center justify-center">
                          {file.type.startsWith("video") ? (
                             <video src={URL.createObjectURL(file)} className="max-w-full max-h-[300px] object-contain" controls />
                          ) : (
                             <img src={URL.createObjectURL(file)} className="max-w-full max-h-[300px] object-contain" />
                          )}
                       </div>
                     )}
                     <button
                        onClick={addMedia}
                        disabled={!file}
                        className={`w-full py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-colors ${
                          file ? "bg-accent text-black hover:bg-accent/90" : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                        }`}
                     >
                        Commit to Database
                     </button>
                  </div>
                </section>

                <section>
                   <h2 className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-6">Asset Library ({media.length})</h2>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {media.map((m) => (
                       <div key={m.id} className="group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20">
                         <div className="aspect-[4/5] bg-black flex items-center justify-center">
                           {m.type === "video" ? (
                             <video src={m.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" controls />
                           ) : (
                             <img src={m.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                           )}
                         </div>
                         <div className="p-3">
                           <button onClick={() => deleteMedia(m.id)} className="w-full py-2 bg-red-500/10 text-red-500 text-xs tracking-wider uppercase font-semibold rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                             Purge
                           </button>
                         </div>
                       </div>
                     ))}
                     {media.length === 0 && <p className="text-gray-600 font-lightcol-span-4">No assets in storage.</p>}
                   </div>
                </section>
              </div>
            )}

            {/* PRODUCTS */}
            {tab === "products" && (
              <div className="space-y-12">
                <section className="bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-10">
                  <div className="flex-1 space-y-4">
                     <h2 className="text-lg text-white font-medium mb-6">Add Pre-Booking Item</h2>
                     <input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                     <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Current Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                        <input placeholder="Original MSRP (₹)" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                     </div>
                     <p className="text-xs text-center text-gray-600 mt-2 font-medium tracking-wide uppercase">— OR —</p>
                     <input placeholder="External Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                     <input type="file" accept="image/*" onChange={(e) => setProductFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:uppercase file:bg-white/10 file:text-white cursor-pointer" />
                     
                     <button onClick={addProduct} className="w-full mt-4 bg-white text-black py-4 rounded-xl text-sm font-semibold tracking-widest uppercase hover:bg-gray-200 transition">
                        Insert Pre-Booking Item
                     </button>
                  </div>
                  <div className="md:w-64 border border-white/5 bg-black rounded-xl p-4 flex flex-col items-center justify-center min-h-[250px] text-gray-600">
                     {productFile ? (
                        <img src={URL.createObjectURL(productFile)} className="w-full h-full object-contain" />
                     ) : image ? (
                        <img src={image} className="w-full h-full object-contain" />
                     ) : (
                        <span className="text-xs tracking-widest uppercase text-center block">Image Preview</span>
                     )}
                  </div>
                </section>

                <section>
                   <h2 className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-6">Database Catalog ({products.length})</h2>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                     {products.map((p) => (
                       <div key={p.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group">
                         <div className="h-40 bg-[#0a0a0a] flex items-center justify-center p-4">
                           <img src={p.image} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                         </div>
                         <div className="p-4 border-t border-white/5 space-y-1">
                           <h3 className="text-sm font-medium text-white truncate">{p.name}</h3>
                           <p className="text-xs text-gray-400">₹{p.price} <span className="line-through opacity-50 ml-1">₹{p.original_price}</span></p>
                           <button onClick={() => deleteProduct(p.id)} className="w-full mt-3 py-1.5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-colors">
                             Purge entry
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                </section>
              </div>
            )}

            {/* TESTIMONIALS */}
            {tab === "testimonials" && (
              <div className="space-y-12">
                <section className="bg-[#111] border border-white/5 p-8 rounded-2xl max-w-2xl">
                  <h2 className="text-lg text-white font-medium mb-6">Syndicate Voice</h2>
                  <div className="space-y-4">
                     <input placeholder="Client Identifier / Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                     <textarea placeholder="Client Quote" rows={3} value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-colors resize-none" />
                     <button onClick={addTestimonial} className="w-full bg-white text-black py-4 rounded-xl text-sm font-semibold tracking-widest uppercase hover:bg-gray-200 transition">
                        Add Endorsement
                     </button>
                  </div>
                </section>

                <section>
                   <h2 className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-6">Live Endorsements ({testimonials.length})</h2>
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {testimonials.map((t) => (
                       <div key={t.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col">
                         <p className="text-gray-300 font-light leading-relaxed mb-6 italic flex-1">"{t.message}"</p>
                         <div className="flex justify-between items-center border-t border-white/5 pt-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">— {t.name}</p>
                            <button onClick={() => deleteTestimonial(t.id)} className="text-[10px] text-red-500 uppercase tracking-widest font-bold hover:underline">Revoke</button>
                         </div>
                       </div>
                     ))}
                   </div>
                </section>
              </div>
            )}
         </motion.div>
      </div>
    </div>
  );
}
