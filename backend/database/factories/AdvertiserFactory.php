<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Advertiser;

class AdvertiserFactory extends Factory
{
    protected $model = Advertiser::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
        ];
    }
}
