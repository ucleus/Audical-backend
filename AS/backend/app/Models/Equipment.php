<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'manufacturer',
        'model_number',
        'year_of_manufacture',
        'type',
        'condition',
        'description',
        'price',
        'is_negotiable',
        'stock_quantity',
        'location',
        'fda_approved',
        'ce_marked',
        'last_calibration_date',
        'warranty_details',
        'service_history',
        'manuals_included',
        'status',
        'user_id',
    ];

    protected $casts = [
        'is_negotiable' => 'boolean',
        'fda_approved' => 'boolean',
        'ce_marked' => 'boolean',
        'last_calibration_date' => 'date',
        'price' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($equipment) {
            if (empty($equipment->slug)) {
                $equipment->slug = Str::slug($equipment->title) . '-' . Str::random(5);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(EquipmentImage::class)->orderBy('order');
    }

    public function primaryImage()
    {
        return $this->hasOne(EquipmentImage::class)->where('is_primary', true);
    }
}