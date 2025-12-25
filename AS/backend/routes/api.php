<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PublicEquipmentController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/inquiries', [InquiryController::class, 'store']);
Route::get('/public/equipment', [PublicEquipmentController::class, 'index']);
Route::get('/public/equipment/{id}', [PublicEquipmentController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->load('role');
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Equipment routes
    Route::get('/equipment', [EquipmentController::class, 'index']);
    Route::get('/equipment/{equipment}', [EquipmentController::class, 'show']);
    
    // Management routes (Super Admin and Editor only)
    Route::middleware('role:super-admin,editor')->group(function () {
        Route::post('/equipment', [EquipmentController::class, 'store']);
        Route::put('/equipment/{equipment}', [EquipmentController::class, 'update']);
        Route::delete('/equipment/{equipment}', [EquipmentController::class, 'destroy']);
        
        // Inquiry Management
        Route::get('/inquiries', [InquiryController::class, 'index']);
        Route::get('/inquiries/{inquiry}', [InquiryController::class, 'show']);
        Route::put('/inquiries/{inquiry}', [InquiryController::class, 'update']);
        
        // Order Management
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::put('/orders/{order}', [OrderController::class, 'update']);
    });

    // User Management routes (Super Admin only)
    Route::middleware('role:super-admin')->group(function () {
        Route::get('/roles', [UserController::class, 'getRoles']);
        Route::apiResource('users', UserController::class);
    });
});