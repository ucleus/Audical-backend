<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_user_can_request_otp(): void
    {
        $role = Role::where('slug', 'super-admin')->first();
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'role_id' => $role->id,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'otp']);
        
        $this->assertNotNull($user->fresh()->otp_code);
    }

    public function test_user_can_login_with_valid_otp(): void
    {
        $role = Role::where('slug', 'super-admin')->first();
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'role_id' => $role->id,
            'otp_code' => '123456',
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        $response = $this->postJson('/api/verify-otp', [
            'email' => 'test@example.com',
            'otp' => '123456',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['access_token', 'user']);
        
        $this->assertNull($user->fresh()->otp_code);
    }

    public function test_user_cannot_login_with_invalid_otp(): void
    {
        $role = Role::where('slug', 'super-admin')->first();
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'role_id' => $role->id,
            'otp_code' => '123456',
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        $response = $this->postJson('/api/verify-otp', [
            'email' => 'test@example.com',
            'otp' => '654321',
        ]);

        $response->assertStatus(401);
    }
}