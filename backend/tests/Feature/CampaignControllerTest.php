<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\User;
use App\Models\Advertiser;
use App\Models\Country;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CampaignControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $advertiser;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->advertiser = Advertiser::factory()->create(['user_id' => $this->user->id]);
        $this->token = $this->user->createToken('auth_token')->plainTextToken;
    }

    #[Test]
    public function a_user_can_create_a_campaign()
    {
        $country = Country::factory()->create(); // ایجاد کشور برای جلوگیری از خطای 422
        $response = $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->postJson('/api/campaigns', [
            'title' => 'Test Campaign',
            'landing_page_url' => 'https://example.com',
            'activity_status' => 'active',
            'payouts' => [
                ['country_id' => $country->id, 'amount' => 2.5],
            ]
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'campaign']);
    }

    #[Test]
    public function a_user_can_view_campaigns()
    {
        Campaign::factory()->create(['advertiser_id' => $this->advertiser->id]);

        $response = $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->getJson('/api/campaigns');

        $response->assertStatus(200);
    }

    #[Test]
    public function a_user_can_view_a_single_campaign()
    {
        $campaign = Campaign::factory()->create(['advertiser_id' => $this->advertiser->id]);

        $response = $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->getJson("/api/campaigns/{$campaign->id}");

        $response->assertStatus(200);
    }

    #[Test]
    public function a_user_can_update_campaign_status()
    {
        $campaign = Campaign::factory()->create(['advertiser_id' => $this->advertiser->id]);

        $response = $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->patchJson("/api/campaigns/{$campaign->id}/status", [
            'activity_status' => 'paused',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Campaign status updated successfully.']);
    }
}
