<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function stats(): JsonResponse
    {
        return response()->json([
            'equipment' => [
                'total' => Equipment::count(),
                'active' => Equipment::where('status', 'active')->count(),
                'draft' => Equipment::where('status', 'draft')->count(),
                'value' => Equipment::where('status', 'active')->sum('price'),
            ],
            'inquiries' => [
                'total' => Inquiry::count(),
                'new' => Inquiry::where('status', 'new')->count(),
            ],
            'users' => [
                'total' => User::count(),
            ]
        ]);
    }
}