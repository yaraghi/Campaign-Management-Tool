<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Advertiser;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    /**
     * @var string
     */
    protected $model = Campaign::class;

    /**
     * @return array
     */
    public function definition()
    {
        return [
            'advertiser_id'    => Advertiser::factory(),
            'title'            => $this->faker->sentence(3),
            'landing_page_url' => $this->faker->url(),
            'activity_status'  => $this->faker->randomElement(['active', 'paused']),
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function active()
    {
        return $this->state([
            'activity_status' => 'active',
        ]);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function paused()
    {
        return $this->state([
            'activity_status' => 'paused',
        ]);
    }
}
