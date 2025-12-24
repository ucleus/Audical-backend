<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\Role;
use App\Models\User;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_inquiry()
    {
        $equipment = Equipment::factory()->create();

        $payload = [
            'equipment_id' => $equipment->id,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Is this available?',
        ];

        $response = $this->postJson('/api/inquiries', $payload);

        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'inquiry']);

        $this->assertDatabaseHas('inquiries', ['email' => 'john@example.com']);
    }

    public function test_admin_can_list_inquiries()
    {
        $role = Role::factory()->create(['slug' => 'super-admin']);
        $user = User::factory()->create(['role_id' => $role->id]);
        Inquiry::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'message' => 'Hello',
        ]);

        $response = $this->actingAs($user)->getJson('/api/inquiries');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_admin_can_update_status()
    {
        $role = Role::factory()->create(['slug' => 'super-admin']);
        $user = User::factory()->create(['role_id' => $role->id]);
        $inquiry = Inquiry::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'message' => 'Hello',
        ]);

        $response = $this->actingAs($user)->putJson("/api/inquiries/{$inquiry->id}", [
            'status' => 'read'
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('inquiries', ['id' => $inquiry->id, 'status' => 'read']);
    }
}