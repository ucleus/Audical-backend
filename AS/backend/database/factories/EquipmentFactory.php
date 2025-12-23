<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'manufacturer' => $this->faker->company(),
            'model_number' => $this->faker->bothify('??-####'),
            'year_of_manufacture' => $this->faker->year(),
            'type' => $this->faker->randomElement(['Diagnostic', 'Surgical', 'Therapeutic', 'Dental']),
            'condition' => $this->faker->randomElement(['New', 'Used - Like New', 'Used - Good', 'Used - Fair']),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 100, 100000),
            'is_negotiable' => $this->faker->boolean(),
            'stock_quantity' => $this->faker->numberBetween(1, 10),
            'location' => $this->faker->city(),
            'fda_approved' => $this->faker->boolean(),
            'ce_marked' => $this->faker->boolean(),
            'status' => 'active',
            'user_id' => User::factory(),
        ];
    }
}