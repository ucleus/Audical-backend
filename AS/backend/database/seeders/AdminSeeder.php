<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::where('slug', 'super-admin')->first();

        User::updateOrCreate(
            ['email' => 'admin@audical.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'), // Temporary password
                'role_id' => $superAdminRole->id,
            ]
        );
    }
}