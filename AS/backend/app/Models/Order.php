<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'equipment_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_address',
        'amount',
        'currency',
        'payment_status',
        'payment_method',
        'transaction_id',
        'status',
        'shipping_carrier',
        'tracking_number',
        'shipped_at',
    ];

    protected $casts = [
        'shipped_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}