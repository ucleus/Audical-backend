<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_super_admin_can_list_users(): void
    {
        $role = Role::where('slug', 'super-admin')->first();
        $admin = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($admin);

        User::factory()->count(3)->create();

        $response = $this->getJson('/api/users');

        $response->assertStatus(200)
                 ->assertJsonCount(4, 'data'); // 3 created + 1 admin
    }

    public function test_editor_cannot_list_users(): void
    {
        $role = Role::where('slug', 'editor')->first();
        $editor = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($editor);

        $response = $this->getJson('/api/users');

        $response->assertStatus(403);
    }

    public function test_super_admin_can_create_user(): void
    {
        $role = Role::where('slug', 'super-admin')->first();
        $admin = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($admin);

        $editorRole = Role::where('slug', 'editor')->first();

        $response = $this->postJson('/api/users', [
            'name' => 'New Editor',
            'email' => 'editor@example.com',
            'role_id' => $editorRole->id,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.email', 'editor@example.com');
    }
}