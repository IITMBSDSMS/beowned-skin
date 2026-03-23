"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);
  const updateName = async () => {
    if (!newName) return alert("Enter name");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: newName },
    });

    if (error) {
      alert("Error updating name");
    } else {
      alert("Name updated!");
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
      alert("Photo updated!");
      window.location.reload();
    }
  };

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
          console.log("Realtime update:", payload);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return <p className="text-gray-900">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 flex relative overflow-hidden">
      {/* Background SVG */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600" fill="none">
        <circle cx="200" cy="200" r="200" fill="#e0f2fe" />
        <circle cx="600" cy="400" r="200" fill="#fce7f3" />
      </svg>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 shadow-sm p-6 z-50 transform transition-transform duration-300 md:rounded-r-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-8 text-gray-900">My Account</h2>

        <nav className="space-y-4 text-gray-600">
          {["profile","orders","payments","settings"].map((tab) => (
            <p
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
              className={`cursor-pointer capitalize px-3 py-2 rounded-lg transition ${
                activeTab === tab
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab}
            </p>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10">
        {/* Header */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 mb-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white shadow-md px-4 py-2 rounded-lg w-full md:w-auto text-center"
          >
            Logout
          </button>
        </div>

        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-xl font-bold">{orders.length}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-sm text-gray-500">Total Spent</p>
              <h3 className="text-xl font-bold">
                ₹{orders.reduce((sum, o) => sum + Number(o.amount), 0)}
              </h3>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-bold">
                {orders.filter(o => o.status !== "Paid").length}
              </h3>
            </div>
          </div>

          {activeTab === "profile" && (
            <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 text-center md:text-left">
              <img
                src={
                  user.user_metadata?.avatar_url ||
                  "https://ui-avatars.com/api/?name=User"
                }
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.user_metadata?.full_name || "User"}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Recent Orders</h2>

              <div className="grid gap-3 md:gap-4">
                {loadingOrders && <p className="text-gray-500">Loading orders...</p>}
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                  >
                    <div>
                      <p className="font-medium">{order.product_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="font-semibold">₹{order.amount}</p>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : order.status === "Failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status || "Paid"}
                      </span>
                    </div>
                  </div>
                ))}
                {!loadingOrders && orders.length === 0 && (
                  <div className="text-center text-gray-500 py-10">
                    <p className="mb-2">No orders yet.</p>
                    <p className="text-sm">Start shopping to see your orders here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Payments</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <p className="text-gray-500">No payment history yet.</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Settings</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                
                <div className="flex gap-3">
                  <input
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-3 py-2 border rounded-lg w-full"
                  />
                  <button
                    onClick={updateName}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>

                <div>
                  <input type="file" onChange={uploadPhoto} />
                  {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}