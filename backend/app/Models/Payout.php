<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'country_id',
        'amount'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
