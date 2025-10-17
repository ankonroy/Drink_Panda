<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Orange Juice',
                'description' => 'Freshly squeezed orange juice',
                'details' => 'Our freshly squeezed orange juice is made from the finest oranges, packed with vitamin C and natural sweetness. Each bottle contains pure orange goodness with no added preservatives or artificial flavors. Perfect for breakfast or as a refreshing drink throughout the day.',
                'price_cents' => 499, // $4.99
                'image_url' => 'https://via.placeholder.com/400x400/FFA500/FFFFFF?text=Orange+Juice',
                'category' => 'juice',
                'stock' => 50
            ],
            [
                'name' => 'Energy Boost',
                'description' => 'High-caffeine energy drink',
                'details' => 'Energy Boost is designed to give you the perfect pick-me-up when you need it most. With a balanced blend of caffeine, B-vitamins, and natural energizers, this drink provides sustained energy without the crash. Great for workouts, late nights, or whenever you need an extra boost.',
                'price_cents' => 299, // $2.99
                'image_url' => 'https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Energy+Boost',
                'category' => 'caffeine',
                'stock' => 100
            ],
            [
                'name' => 'Sparkling Water',
                'description' => 'Refreshing carbonated water',
                'details' => 'Pure, refreshing sparkling water with just the right amount of carbonation. Our sparkling water is sourced from natural springs and goes through a meticulous filtration process. Zero calories, no sweeteners, and perfectly bubbly - the ultimate thirst quencher for any occasion.',
                'price_cents' => 199, // $1.99
                'image_url' => 'https://via.placeholder.com/400x400/00BFFF/FFFFFF?text=Sparkling+Water',
                'category' => 'drinks',
                'stock' => 200
            ],
            [
                'name' => 'Apple Juice',
                'description' => '100% pure apple juice',
                'details' => 'Made from crisp, fresh apples, our 100% pure apple juice delivers the authentic taste of orchard-fresh apples. No concentrates, no added sugar - just the natural sweetness and nutritional benefits of real apples. Rich in antioxidants and perfect for all ages.',
                'price_cents' => 449, // $4.49
                'image_url' => 'https://via.placeholder.com/400x400/32CD32/FFFFFF?text=Apple+Juice',
                'category' => 'juice',
                'stock' => 75
            ],
            [
                'name' => 'Cold Brew Coffee',
                'description' => 'Smooth cold brew coffee',
                'details' => 'Our cold brew coffee is steeped for 18 hours to extract the smoothest, richest flavor without the bitterness of hot brewing. Made from premium Arabica beans, this refreshing coffee drink is perfect served cold over ice. Less acidic and more caffeinated than regular coffee.',
                'price_cents' => 399, // $3.99
                'image_url' => 'https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Cold+Brew',
                'category' => 'caffeine',
                'stock' => 60
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}