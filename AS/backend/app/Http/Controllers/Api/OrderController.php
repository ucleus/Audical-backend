<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * List all orders.
     */
    public function index(Request $request)
    {
        $query = Order::with('equipment');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->payment_status) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->latest()->paginate(15);
        return response()->json($orders);
    }

    /**
     * Create a new order (Mark equipment as Sold).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'equipment_id' => 'required|exists:equipment,id',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => auth()->id(),
                'equipment_id' => $request->equipment_id,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'amount' => $request->amount,
                'status' => 'pending',
                'payment_status' => 'unpaid',
            ]);

            // Mark equipment as Sold
            $equipment = Equipment::find($request->equipment_id);
            $equipment->update(['status' => 'sold']);

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully.',
                'order' => $order->load('equipment'),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create order: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update order details (Shipping/Payment).
     */
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        
        // If shipping info added, mark as shipped
        if ($request->tracking_number && $order->status === 'pending') {
            $order->update([
                'status' => 'shipped',
                'shipped_at' => now(),
            ]);
        }

        return response()->json([
            'message' => 'Order updated.',
            'order' => $order,
        ]);
    }
}