<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SeanBlakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::where('slug', 'super-admin')->first();

        User::updateOrCreate(
            ['email' => 'hi@seanblake.info'],
            [
                'name' => 'Sean Blake',
                'password' => Hash::make('Mika@13Auriah@16'),
                'role_id' => $superAdminRole->id,
            ]
        );
    }
}
