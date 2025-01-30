<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    public function run()
    {
        DB::table('countries')->updateOrInsert(
            ['code' => 'EE'], 
            ['name' => 'Estonia', 'updated_at' => now()]
        );

        DB::table('countries')->updateOrInsert(
            ['code' => 'ES'], 
            ['name' => 'Spain', 'updated_at' => now()]
        );

        DB::table('countries')->updateOrInsert(
            ['code' => 'BG'], 
            ['name' => 'Bulgaria', 'updated_at' => now()]
        );
    }
}
