"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type User } from "@/lib/auth";
import {
  getDashboardStats,
  type DashboardStats,
  type Transaction,
} from "@/lib/admin";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    if (currentUser.role !== "admin") {
      router.replace("/");
      return;
    }
    setUser(currentUser);

    // Fetch dashboard stats
    fetchDashboardStats();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // Will redirect
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-emerald-500">
            {stats?.totalProducts || 0}
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-emerald-500">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-emerald-500">
            {stats?.totalTransactions || 0}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTransactions.map((transaction: Transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700">
                    <td className="py-2">{transaction.id}</td>
                    <td className="py-2">{transaction.user?.name || "N/A"}</td>
                    <td className="py-2">
                      ${(transaction.amount / 100).toFixed(2)}
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          transaction.status === "completed"
                            ? "bg-green-600 text-white"
                            : transaction.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-2">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
}
