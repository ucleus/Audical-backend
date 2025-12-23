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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('manufacturer');
            $table->string('model_number');
            $table->integer('year_of_manufacture')->nullable();
            
            // Categorization
            $table->string('type'); // Diagnostic, Surgical, etc.
            $table->string('condition'); // New, Used - Like New, etc.
            $table->text('description')->nullable();

            // Pricing & Logistics
            $table->decimal('price', 15, 2);
            $table->boolean('is_negotiable')->default(false);
            $table->integer('stock_quantity')->default(1);
            $table->string('location')->nullable();

            // Compliance
            $table->boolean('fda_approved')->default(false);
            $table->boolean('ce_marked')->default(false);
            $table->date('last_calibration_date')->nullable();

            // Support
            $table->text('warranty_details')->nullable();
            $table->text('service_history')->nullable();
            $table->text('manuals_included')->nullable();

            // Status
            $table->string('status')->default('draft'); // draft, active, sold, archived

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};