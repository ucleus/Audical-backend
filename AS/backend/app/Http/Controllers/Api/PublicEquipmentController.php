<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicEquipmentController extends Controller
{
    /**
     * List active equipment for public view.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Equipment::with('images')
            ->where('status', 'active');

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('manufacturer', 'like', "%{$search}%")
                  ->orWhere('model_number', 'like', "%{$search}%");
            });
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->condition) {
            $query->where('condition', $request->condition);
        }

        // Price Range
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        $equipment = $query->latest()->paginate(12);

        return response()->json($equipment);
    }

    /**
     * Show details of a specific active item.
     */
    public function show($id): JsonResponse
    {
        $equipment = Equipment::with('images')
            ->where('status', 'active')
            ->findOrFail($id);

        return response()->json($equipment);
    }
}