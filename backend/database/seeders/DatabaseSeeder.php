<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CountrySeeder::class, 
            UserSeeder::class,    
            AdvertiserSeeder::class,
            CampaignSeeder::class, 
            PayoutSeeder::class,  
        ]);
    }
}
