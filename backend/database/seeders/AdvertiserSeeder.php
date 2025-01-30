<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AdvertiserSeeder extends Seeder
{
    public function run()
    {
        $users = User::take(2)->get();

        if ($users->count() < 2) {
            $users = User::factory()->count(2)->create();
        }

        DB::table('advertisers')->insert([
            [
                'user_id'    => $users[0]->id,
                'name'       => 'Test Advertiser 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => $users[1]->id, 
                'name'       => 'Test Advertiser 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
