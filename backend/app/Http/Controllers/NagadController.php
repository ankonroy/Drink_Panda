<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Karim007\LaravelNagad\Facade\NagadPayment;
use Karim007\LaravelNagad\Facade\NagadRefund;

class NagadController extends Controller
{
    public function pay() 
    {
        $amount = 1000;
        $trx_id = uniqid();
        //if you have multipule/dynamic callback url then uncomment bellow line and use dynamic callbackurl
        //otherwise don't do anything
        //config(['nagad.callback_url' => env('NAGAD_CALLBACK_URL')]);
        
        $response = NagadPayment::create($amount, $trx_id); // 1st parameter is amount and 2nd is unique invoice number

        //$response = NagadPayment::create($amount, $trx_id,1); // additional last parameter for manage difference account

        if (isset($response) && $response->status == "Success"){
            return redirect()->away($response->callBackUrl);
        }
        return redirect()->back()->with("error-alert", "Invalid request try again after few time later");
    }

    public function callback(Request $request)
    {
        if (!$request->status && !$request->order_id) {
            return response()->json([
                "error" => "Not found any status"
            ], 500);
        }

        // Extract order_id from trx_id (format: NAGAD-{order_id}-{uniqid})
        $trxId = $request->order_id;
        $orderId = null;
        if (preg_match('/NAGAD-(\d+)-/', $trxId, $matches)) {
            $orderId = $matches[1];
        }

        if (!$orderId) {
            return response()->json(["error" => "Invalid transaction ID"], 400);
        }

        $order = \App\Models\Order::find($orderId);
        if (!$order) {
            return response()->json(["error" => "Order not found"], 404);
        }

        if (config("nagad.response_type") == "json") {
            return response()->json($request->all());
        }

        $verify = NagadPayment::verify($request->payment_ref_id);

        if (isset($verify->status) && $verify->status == "Success") {
            // Update order and create transaction
            $order->update(['status' => 'paid']);
            \App\Models\Transaction::create([
                'order_id' => $order->id,
                'gateway' => 'nagad',
                'gateway_txn_id' => $verify->orderId,
                'amount_cents' => $order->total_cents,
                'status' => 'success',
                'raw_response' => (array) $verify,
            ]);

            return $this->success($verify->orderId);
        } else {
            // Payment failed
            $order->update(['status' => 'failed']);
            \App\Models\Transaction::create([
                'order_id' => $order->id,
                'gateway' => 'nagad',
                'gateway_txn_id' => $trxId,
                'amount_cents' => $order->total_cents,
                'status' => 'failed',
                'raw_response' => (array) $verify,
            ]);

            return $this->fail($trxId);
        }
    }

    public function success($transId)
    {
        // Redirect to order success page
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/order-success?txn=' . $transId);
    }

    public function fail($transId)
    {
        // Redirect to checkout with error
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/checkout?error=payment_failed');
    }
}
