<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NagadController;
use App\Http\Controllers\BkashTokenizePaymentController;

// Public routes
Route::get('/health', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Drinks API is running',
        'timestamp' => now()->toDateTimeString()
    ]);
});

// Route::post('/register', function () {
//     return response()->json([
//         'status' => 'success',
//         'message' => 'Drinks API is running',
//         'timestamp' => now()->toDateTimeString()
//     ]);
// });

// Product routes (public)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    });
    
    // Account management
    Route::post('/user/change-password', [AuthController::class, 'changePassword']);
    Route::post('/user/delete', [AuthController::class, 'deleteAccount']);
    Route::post('/user/avatar', [AuthController::class, 'updateAvatar']);
    
    // Orders / Checkout
    Route::post('/checkout/create', [CheckoutController::class, 'createOrder']);
    Route::post('/checkout/initiate-payment', [CheckoutController::class, 'initiatePayment']);
    Route::get('/orders', [CheckoutController::class, 'myOrders']);

    // Admin product management
    Route::middleware('role:admin')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);

        // Admin dashboard
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    });
});


Route::get('nagad/pay',[NagadController::class,'pay'])->name('nagad.pay');
Route::get('nagad/callback', [NagadController::class,'callback']);
Route::get('nagad/refund/{paymentRefId}', [NagadController::class,'refund']);

Route::group(['middleware' => ['web']], function () {
    // Payment Routes for bKash
    Route::get('/bkash/payment', [BkashTokenizePaymentController::class,'index']);
    Route::get('/bkash/create-payment', [BkashTokenizePaymentController::class,'createPayment'])->name('bkash-create-payment');
    Route::get('/bkash/callback', [BkashTokenizePaymentController::class,'callBack'])->name('bkash-callBack');

    //search payment
    Route::get('/bkash/search/{trxID}', [BkashTokenizePaymentController::class,'searchTnx'])->name('bkash-serach');

    //refund payment routes
    Route::get('/bkash/refund', [BkashTokenizePaymentController::class,'refund'])->name('bkash-refund');
    Route::get('/bkash/refund/status', [BkashTokenizePaymentController::class,'refundStatus'])->name('bkash-refund-status');

});
