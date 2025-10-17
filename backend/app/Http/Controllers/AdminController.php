<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $totalProducts = Product::count();
        $totalUsers = User::count();
        $totalTransactions = Transaction::count();

        $recentTransactions = Transaction::with('order.user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => (string) $transaction->id,
                    'amount' => $transaction->amount_cents,
                    'status' => $transaction->status,
                    'created_at' => $transaction->created_at->toISOString(),
                    'user' => $transaction->order && $transaction->order->user ? [
                        'name' => $transaction->order->user->name
                    ] : null
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'totalProducts' => $totalProducts,
                'totalUsers' => $totalUsers,
                'totalTransactions' => $totalTransactions,
                'recentTransactions' => $recentTransactions
            ]
        ]);
    }
}
