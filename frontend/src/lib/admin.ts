import { getAuthHeaders, API_URL } from "@/lib/auth";

export interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalTransactions: number;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  user?: {
    name: string;
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const headers = getAuthHeaders();
//   console.log(headers)
  const response = await fetch(`${API_URL}/api/admin/dashboard`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  const data = await response.json();
  return data.data;
}
