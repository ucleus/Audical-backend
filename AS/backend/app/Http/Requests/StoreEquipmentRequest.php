<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'model_number' => 'required|string|max:255',
            'year_of_manufacture' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'type' => 'required|string',
            'condition' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'is_negotiable' => 'boolean',
            'stock_quantity' => 'integer|min:0',
            'location' => 'nullable|string|max:255',
            'fda_approved' => 'boolean',
            'ce_marked' => 'boolean',
            'last_calibration_date' => 'nullable|date',
            'warranty_details' => 'nullable|string',
            'service_history' => 'nullable|string',
            'manuals_included' => 'nullable|string',
            'status' => 'string|in:draft,active,sold,archived',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ];
    }
}