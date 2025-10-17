<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'details',
        'price_cents',
        'image_url',
        'category',
        'stock'
    ];

    protected $casts = [
        'price_cents' => 'integer',
        'stock' => 'integer'
    ];
}