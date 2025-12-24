<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InquiryController extends Controller
{
    /**
     * Submit a new inquiry (Public).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'equipment_id' => 'nullable|exists:equipment,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $inquiry = Inquiry::create($request->all());

        return response()->json([
            'message' => 'Inquiry submitted successfully.',
            'inquiry' => $inquiry
        ], 201);
    }

    /**
     * List all inquiries (Admin).
     */
    public function index()
    {
        $inquiries = Inquiry::with('equipment:id,title,images')->latest()->paginate(15);
        return response()->json($inquiries);
    }

    /**
     * Show a specific inquiry (Admin).
     */
    public function show($id)
    {
        $inquiry = Inquiry::with('equipment')->findOrFail($id);
        
        // Auto-mark as read if new
        if ($inquiry->status === 'new') {
            $inquiry->update(['status' => 'read']);
        }

        return response()->json($inquiry);
    }

    /**
     * Update inquiry status (Admin).
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,read,responded,closed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $inquiry = Inquiry::findOrFail($id);
        $inquiry->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Inquiry status updated.',
            'inquiry' => $inquiry
        ]);
    }
}