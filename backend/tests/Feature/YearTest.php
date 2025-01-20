<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class YearTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_getYears(): void
    {

        $response = $this->actingAs(parent::user(), 'sanctum')->get('/api/master/year');

        $response->assertStatus(200);
        $response->assertJson([
            "message" => null,
            "result" => [
                'id' => "",'name', 'description', 'active', 'created_at', 'updated_at'
            ]
        ]);
    }

    public function addYear(): void
    {
        $response = $this->post('/api/year', [
            'name' => fake()->year,
            'description' => fake()->text(5),
            'active' => fake()->numberBetween(1,2),
        ]);
        $response->assertStatus(201);
        $response->assertJson([
            "message" => null,
            "result" => []
        ]);
    }
}
