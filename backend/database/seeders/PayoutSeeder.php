<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PayoutSeeder extends Seeder
{
    public function run()
    {
        $campaigns = Campaign::all();
        $countries = Country::all();

        if ($campaigns->isEmpty() || $countries->isEmpty()) {
            $this->command->warn('No campaigns or countries found. Skipping PayoutSeeder.');
            return;
        }

        DB::table('payouts')->insert([
            [
                'campaign_id' => $campaigns->random()->id,
                'country_id'  => $countries->where('code', 'EE')->first()->id ?? $countries->first()->id, // Estonia
                'amount'      => 2.50,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'campaign_id' => $campaigns->random()->id,
                'country_id'  => $countries->where('code', 'ES')->first()->id ?? $countries->first()->id, // Spain
                'amount'      => 3.00,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'campaign_id' => $campaigns->random()->id,
                'country_id'  => $countries->where('code', 'EE')->first()->id ?? $countries->first()->id, // Estonia
                'amount'      => 1.00,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'campaign_id' => $campaigns->random()->id,
                'country_id'  => $countries->where('code', 'BG')->first()->id ?? $countries->first()->id, // Bulgaria
                'amount'      => 2.00,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'campaign_id' => $campaigns->random()->id,
                'country_id'  => $countries->where('code', 'ES')->first()->id ?? $countries->first()->id, // Spain
                'amount'      => 3.50,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}
