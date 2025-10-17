<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $query = Product::query();

        // Search functionality
        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filtering
        if ($category = request('category')) {
            $query->where('category', $category);
        }

        // Pagination
        $perPage = request('per_page', 30);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'last_page' => $products->lastPage(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem()
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product)
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'details' => 'required|string',
            'priceCents' => 'required|integer|min:1',
            'category' => 'required|in:juice,caffeine,drinks',
            'stock' => 'required|integer|min:0',
            'imageUrl' => 'required|url',
        ]);

        // Convert camelCase to snake_case for database
        $productData = [
            'name' => $validated['name'],
            'description' => $validated['description'],
            'details' => $validated['details'],
            'price_cents' => $validated['priceCents'],
            'category' => $validated['category'],
            'stock' => $validated['stock'],
            'image_url' => $validated['imageUrl'],
        ];

        $product = Product::create($productData);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product)
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:500',
            'details' => 'sometimes|required|string',
            'priceCents' => 'sometimes|required|integer|min:1',
            'category' => 'sometimes|required|in:juice,caffeine,drinks',
            'stock' => 'sometimes|required|integer|min:0',
            'imageUrl' => 'sometimes|required|url',
        ]);

        // Convert camelCase to snake_case for database
        $productData = [];
        if (isset($validated['name'])) $productData['name'] = $validated['name'];
        if (isset($validated['description'])) $productData['description'] = $validated['description'];
        if (isset($validated['details'])) $productData['details'] = $validated['details'];
        if (isset($validated['priceCents'])) $productData['price_cents'] = $validated['priceCents'];
        if (isset($validated['category'])) $productData['category'] = $validated['category'];
        if (isset($validated['stock'])) $productData['stock'] = $validated['stock'];
        if (isset($validated['imageUrl'])) $productData['image_url'] = $validated['imageUrl'];

        $product->update($productData);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product)
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
