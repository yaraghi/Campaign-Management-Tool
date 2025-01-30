<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'advertiser_id',
        'title',
        'landing_page_url',
        'activity_status',
    ];

    protected $attributes = [
        'activity_status' => 'paused',
    ];

    public function advertiser()
    {
        return $this->belongsTo(Advertiser::class)->withDefault();
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }
}
