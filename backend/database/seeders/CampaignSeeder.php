<?php

namespace Database\Seeders;

use App\Models\Advertiser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CampaignSeeder extends Seeder
{
    public function run()
    {
        $advertisers = Advertiser::all();

        if ($advertisers->isEmpty()) {
            $advertisers = Advertiser::factory()->count(2)->create();
        }

        $advertiser1 = $advertisers->first();
        $advertiser2 = $advertisers->skip(1)->first() ?? $advertiser1;

        DB::table('campaigns')->insert([
            [
                'advertiser_id'    => $advertiser1->id,      
                'title'            => 'Campaign A',
                'landing_page_url' => 'https://example.com/A',
                'activity_status'  => 'active',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'advertiser_id'    => $advertiser1->id,
                'title'            => 'Campaign B',
                'landing_page_url' => 'https://example.com/B',
                'activity_status'  => 'paused',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'advertiser_id'    => $advertiser2->id,  
                'title'            => 'Campaign C',
                'landing_page_url' => 'https://example.com/C',
                'activity_status'  => 'active',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
        ]);
    }
}
