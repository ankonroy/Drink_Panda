<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'gateway', 'gateway_txn_id', 'amount_cents', 'status', 'raw_response'
    ];

    protected $casts = [
        'raw_response' => 'array'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
