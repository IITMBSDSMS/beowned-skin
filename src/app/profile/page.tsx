"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
        fetchOrders(data.user.id);
      }
    };

    getUser();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          if (user?.id) {
            fetchOrders(user.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async (userId: string) => {
    setLoadingOrders(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }

    setLoadingOrders(false);
  };

  const updateName = async () => {
    if (!newName) return alert("Enter name");
    const { error } = await supabase.auth.updateUser({
      data: { full_name: newName },
    });

    if (error) {
      alert("Error updating name");
    } else {
      alert("Protocol updated!");
      window.location.reload();
    }
  };

  const uploadPhoto = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `avatars/${user.id}-${Date.now()}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadError) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);

    const { error } = await supabase.auth.updateUser({
      data: { avatar_url: data.publicUrl },
    });

    setUploading(false);

    if (error) {
      alert("Error updating photo");
    } else {
      alert("Profile updated!");
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return (
     <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
     </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-gray-900 flex flex-col md:flex-row pt-20">
        
        {/* Sidebar */}
        <div
          className={`fixed md:static top-20 bottom-0 left-0 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-100 z-40 transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:translate-x-0 ${
            sidebarOpen ? "translate-x-0 shadow-2xl md:shadow-none" : "-translate-x-full"
          }`}
        >
          <div className="p-8 pb-12 h-full overflow-y-auto flex flex-col">
             <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-10">Directory</h2>

             <nav className="space-y-2 text-sm font-medium tracking-wide flex-1">
               {["orders", "profile", "payments", "settings"].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => {
                     setActiveTab(tab);
                     setSidebarOpen(false);
                   }}
                   className={`w-full text-left px-5 py-3 rounded-full transition-all duration-300 capitalize ${
                     activeTab === tab
                       ? "bg-black text-white"
                       : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                   }`}
                 >
                   {tab}
                 </button>
               ))}
             </nav>
             
             <div className="pt-8 border-t border-gray-100 mt-auto">
                <button
                   onClick={handleLogout}
                   className="w-full text-left px-5 py-3 text-sm font-medium tracking-wide text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                   Secure Logout
                </button>
             </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-14 overflow-y-auto max-w-5xl">

          {/* Header Mobile Support */}
          <div className="flex items-center gap-4 mb-10 md:hidden">
            <button
               className="text-gray-900 p-2 border border-gray-200 rounded-full bg-white shadow-sm"
               onClick={() => setSidebarOpen(true)}
             >
               <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
            <h1 className="text-xl font-light tracking-tight text-gray-900">Dashboard</h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Minimal Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Total Orders</p>
                <h3 className="text-3xl font-light tracking-tight">{orders.length}</h3>
              </div>
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Total Volume</p>
                <h3 className="text-3xl font-light tracking-tight">₹{orders.reduce((sum, o) => sum + Number(o.amount), 0)}</h3>
              </div>
              <div className="hidden md:block bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Status</p>
                <h3 className="text-lg font-light tracking-tight mt-3 text-green-600">Active ✓</h3>
              </div>
            </div>

            {/* Content Context */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-gray-100 rounded-[2rem] p-10 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)]"
              >
                <div className="relative group cursor-pointer">
                   <img
                     src={
                       user.user_metadata?.avatar_url ||
                       "https://ui-avatars.com/api/?name=User&background=000000&color=ffffff"
                     }
                     className="w-32 h-32 rounded-full object-cover border border-gray-200 shadow-sm"
                   />
                </div>

                <div className="text-center md:text-left flex-1 mt-2">
                  <h2 className="text-3xl font-light text-gray-900 tracking-tight mb-2">
                    {user.user_metadata?.full_name || "Guest Protocol"}
                  </h2>
                  <p className="text-gray-500 font-light mb-6">{user.email}</p>
                  <p className="inline-block px-4 py-1.5 border border-gray-200 rounded-full text-xs uppercase tracking-widest font-semibold text-gray-600">
                    Verified ID: {user.id.split('-')[0]}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-light mb-8 text-gray-900">Recent Transactions</h2>

                <div className="space-y-4">
                  {loadingOrders && <p className="text-gray-400 font-light text-sm">Synchronizing ledger...</p>}
                  
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] rounded-[1.5rem] p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
                    >
                      <div>
                        <p className="font-medium text-gray-900 tracking-wide mb-1">{order.product_name}</p>
                        <p className="text-xs text-gray-400 tracking-wider uppercase">
                          {new Date(order.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric'})}
                        </p>
                      </div>

                      <div className="sm:text-right flex items-center sm:block gap-4">
                        <p className="font-light text-lg text-gray-900 sm:mb-2">₹{order.amount}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                            order.status === "Paid"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : order.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                              : order.status === "Failed"
                              ? "bg-red-50 text-red-700 border border-red-100"
                              : "bg-gray-50 text-gray-700 border border-gray-100"
                          }`}
                        >
                          {order.status || "Paid"}
                        </span>
                      </div>
                    </div>
                  ))}

                  {!loadingOrders && orders.length === 0 && (
                    <div className="text-center bg-gray-50 border border-gray-100 rounded-[2rem] p-16">
                      <p className="mb-2 text-gray-900 font-medium">No active protocols</p>
                      <p className="text-sm text-gray-500 max-w-sm mx-auto">Purchase a formulation to view your personalized delivery schedule here.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-light mb-8 text-gray-900">Payment Methodology</h2>
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 text-center shadow-sm">
                  <p className="text-gray-400 font-light">Digital vault synchronization is currently pending active invoices.</p>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-light mb-8 text-gray-900">Preferences</h2>
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 space-y-10">
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Identity Signature</label>
                    <div className="flex gap-4">
                      <input
                        placeholder="Current Identity Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-5 py-3 border border-gray-200 rounded-xl w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                      <button
                        onClick={updateName}
                        className="px-8 py-3 bg-black text-white rounded-xl text-sm font-medium tracking-wide hover:bg-gray-800 transition shadow-md"
                      >
                        Commit
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Biometric Avatar</label>
                    <div className="flex items-center gap-6">
                      <input 
                         type="file" 
                         onChange={uploadPhoto} 
                         className="text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                      />
                      {uploading && <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}