<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->onDelete('set null');
            
            // Customer Info
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->text('shipping_address')->nullable();
            
            // Financials
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('USD');
            $table->string('payment_status')->default('unpaid'); // unpaid, paid, refunded
            $table->string('payment_method')->nullable(); // stripe, manual, check
            $table->string('transaction_id')->nullable(); // stripe intent id

            // Logistics
            $table->string('status')->default('pending'); // pending, processing, shipped, delivered, cancelled
            $table->string('shipping_carrier')->nullable();
            $table->string('tracking_number')->nullable();
            $table->timestamp('shipped_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};