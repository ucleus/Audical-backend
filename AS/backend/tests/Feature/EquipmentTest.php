<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EquipmentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_editor_can_create_equipment(): void
    {
        $role = Role::where('slug', 'editor')->first();
        $user = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/equipment', [
            'title' => 'MRI Scanner',
            'manufacturer' => 'Siemens',
            'model_number' => 'Magnetom Sola',
            'type' => 'Diagnostic',
            'condition' => 'New',
            'price' => 50000.00,
            'status' => 'active',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'MRI Scanner');
        
        $this->assertDatabaseHas('equipment', ['title' => 'MRI Scanner']);
    }

    public function test_viewer_cannot_create_equipment(): void
    {
        $role = Role::where('slug', 'viewer')->first();
        $user = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/equipment', [
            'title' => 'MRI Scanner',
            'manufacturer' => 'Siemens',
            'model_number' => 'Magnetom Sola',
            'type' => 'Diagnostic',
            'condition' => 'New',
            'price' => 50000.00,
            'status' => 'active',
        ]);

        $response->assertStatus(403);
    }

    public function test_can_list_equipment(): void
    {
        $role = Role::where('slug', 'viewer')->first();
        $user = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($user);

        Equipment::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/equipment');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function test_can_filter_equipment_by_search(): void
    {
        $role = Role::where('slug', 'viewer')->first();
        $user = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($user);

        Equipment::factory()->create([
            'title' => 'Specialized Drill',
            'user_id' => $user->id
        ]);
        Equipment::factory()->create([
            'title' => 'Basic Table',
            'user_id' => $user->id
        ]);

        $response = $this->getJson('/api/equipment?search=Drill');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonPath('data.0.title', 'Specialized Drill');
    }
}