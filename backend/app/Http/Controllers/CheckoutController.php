<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function createOrder(Request $request): JsonResponse
    {
        $user = $request->user();
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|string',
            'items.*.product_name' => 'required|string',
            'items.*.unit_price_cents' => 'required|integer|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Validate stock availability
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => "Product with ID {$item['product_id']} not found"
                ], 404);
            }
            if ($product->stock < $item['quantity']) {
                return response()->json([
                    'success' => false,
                    'message' => "Insufficient stock for {$product->name}. Available: {$product->stock}, Requested: {$item['quantity']}"
                ], 400);
            }
        }

        $total = 0;
        foreach ($request->items as $it) {
            $total += $it['unit_price_cents'] * $it['quantity'];
        }

        $order = Order::create([
            'user_id' => $user->id,
            'total_cents' => $total,
            'status' => 'pending',
        ]);

        foreach ($request->items as $it) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $it['product_id'],
                'product_name' => $it['product_name'],
                'unit_price_cents' => $it['unit_price_cents'],
                'quantity' => $it['quantity'],
            ]);
        }

        return response()->json(['success' => true, 'data' => $order], 201);
    }

    public function initiatePayment(Request $request): JsonResponse
    {
        $user = $request->user();
        $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'payment_method' => 'required|string|in:bkash,nagad',
        ]);

        $order = Order::where('id', $request->order_id)->where('user_id', $user->id)->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json(['success' => false, 'message' => 'Order is not in pending status'], 400);
        }

        if ($request->payment_method === 'bkash') {
            return $this->initiateBkashPayment($order);
        } elseif ($request->payment_method === 'nagad') {
            return $this->initiateNagadPayment($order);
        }

        return response()->json(['success' => false, 'message' => 'Invalid payment method'], 400);
    }

    private function initiateBkashPayment(Order $order): JsonResponse
    {
        $inv = uniqid();
        $requestData = [
            'intent' => 'sale',
            'mode' => '0011', //0011 for checkout
            'payerReference' => $inv,
            'currency' => 'BDT',
            'amount' => $order->total_cents / 100, // Convert cents to taka
            'merchantInvoiceNumber' => $inv,
            'callbackURL' => config("bkash.callbackURL") . '?order_id=' . $order->id,
        ];

        $request_data_json = json_encode($requestData);

        $response = \Karim007\LaravelBkashTokenize\Facade\BkashPaymentTokenize::cPayment($request_data_json);

        if (isset($response['bkashURL'])) {
            // Store payment ID for callback
            $order->update(['payment_id' => $response['paymentID'] ?? null]);
            return response()->json(['success' => true, 'redirect_url' => $response['bkashURL']]);
        } else {
            return response()->json(['success' => false, 'message' => $response['statusMessage'] ?? 'Payment initiation failed'], 400);
        }
    }

    private function initiateNagadPayment(Order $order): JsonResponse
    {
        $amount = $order->total_cents / 100; // Convert cents to taka
        $trx_id = 'NAGAD-' . $order->id . '-' . uniqid();

        $response = \Karim007\LaravelNagad\Facade\NagadPayment::create($amount, $trx_id);

        if (isset($response) && $response->status == "Success") {
            // Store trx_id for callback
            $order->update(['trx_id' => $trx_id]);
            return response()->json(['success' => true, 'redirect_url' => $response->callBackUrl]);
        }

        return response()->json(['success' => false, 'message' => 'Nagad payment initiation failed'], 400);
    }

    public function myOrders(Request $request): JsonResponse
    {
        $user = $request->user();
        $orders = Order::with('items.product', 'transactions')->where('user_id', $user->id)->get();
        return response()->json(['success' => true, 'data' => $orders]);
    }
}
