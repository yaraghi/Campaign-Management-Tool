<?php

namespace App\Services;

use App\Models\Campaign;
use Illuminate\Support\Facades\Log;

class CampaignService
{
    public function createCampaign(array $data): Campaign
    {
        if (empty($data['advertiser_id'])) {
            throw new \InvalidArgumentException("Advertiser ID is required.");
        }

        $campaign = Campaign::create([
            'advertiser_id'    => $data['advertiser_id'],
            'title'            => $data['title'],
            'landing_page_url' => $data['landing_page_url'],
            'activity_status'  => $data['activity_status'] ?? 'paused'
        ]);

        if (!empty($data['payouts'])) {
            foreach ($data['payouts'] as $payoutData) {
                $campaign->payouts()->create($payoutData);
            }
        }

        return $campaign->load('payouts');
    }

    public function listCampaigns($advertiser = null, ?string $title = null, ?string $status = null)
    {
        $query = Campaign::with('payouts.country');

        if ($advertiser) {
            $query->where('advertiser_id', $advertiser);
        }

        if ($title) {
            $query->where('title', 'like', "%$title%");
        }

        if ($status) {
            $query->where('activity_status', $status);
        }

        return $query->orderBy('id', 'desc')->get();
    }

    public function getCampaign(int $id): ?Campaign
    {
        return Campaign::with('payouts')->find($id);
    }

    public function updateStatus(int $id, string $status): ?Campaign
    {
        if (!in_array($status, ['active', 'paused'])) {
            throw new \InvalidArgumentException("Invalid campaign status.");
        }

        $campaign = Campaign::find($id);
        if (!$campaign) {
            Log::warning("Campaign not found [ID: $id]");
            return null;
        }

        $campaign->update(['activity_status' => $status]);
        return $campaign;
    }
}
