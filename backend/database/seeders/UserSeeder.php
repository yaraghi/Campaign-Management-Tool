<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('users')->count() === 0) {
            DB::table('users')->insert([
                [
                    'name'       => 'Admin User',
                    'email'      => 'admin@example.com',
                    'password'   => Hash::make('password'), 
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name'       => 'Test User',
                    'email'      => 'test@example.com',
                    'password'   => Hash::make('password'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
