<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advertiser_id')
                  ->constrained('advertisers')
                  ->onDelete('cascade');
            $table->string('title');
            $table->string('landing_page_url');
            $table->enum('activity_status', ['active', 'paused'])->default('paused')->index(); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
};
