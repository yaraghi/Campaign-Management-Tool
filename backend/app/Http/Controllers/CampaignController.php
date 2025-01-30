<?php

namespace App\Http\Controllers;

use App\Services\CampaignService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class CampaignController extends Controller
{
    private $campaignService;

    public function __construct(CampaignService $campaignService)
    {
        $this->campaignService = $campaignService;
    }

    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $advertiser = $user->advertiser;
            if (!$advertiser) {
                return response()->json(['error' => 'Advertiser not found'], Response::HTTP_FORBIDDEN);
            }

            $searchTitle = $request->query('title');
            $searchStatus = $request->query('status');

            $campaigns = $this->campaignService->listCampaigns($advertiser->id, $searchTitle, $searchStatus);
            return response()->json($campaigns, Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Error in listing campaigns: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch campaigns'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = $request->user();
            $advertiser = $user->advertiser;
            if (!$advertiser) {
                return response()->json(['error' => 'Advertiser not found'], Response::HTTP_FORBIDDEN);
            }

            $data = $request->validate([
                'title' => 'required|string|max:255',
                'landing_page_url' => 'required|url',
                'activity_status' => ['sometimes', Rule::in(['active', 'paused'])],
                'payouts' => ['required', 'array', 'min:1'],
                'payouts.*.country_id' => ['required', 'exists:countries,id'],
                'payouts.*.amount' => ['required', 'numeric', 'min:0'],
            ]);

            $data['advertiser_id'] = $advertiser->id;
            $campaign = $this->campaignService->createCampaign($data);

            return response()->json([
                'message' => 'Campaign created successfully.',
                'campaign' => $campaign,
            ], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('Error in creating campaign: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create campaign'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $campaign = $this->campaignService->getCampaign((int) $id);
            if (!$campaign) {
                Log::warning("Campaign not found [ID: $id]");
                return response()->json(['error' => 'Campaign not found'], Response::HTTP_NOT_FOUND);
            }

            return response()->json($campaign, Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error("Error in showing campaign [ID: $id]: " . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch campaign'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'activity_status' => ['required', Rule::in(['active', 'paused'])]
            ]);

            $campaign = $this->campaignService->updateStatus((int) $id, $data['activity_status']);
            if (!$campaign) {
                Log::warning("Failed to update campaign status, campaign not found [ID: $id]");
                return response()->json(['error' => 'Campaign not found'], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Campaign status updated successfully.',
                'campaign' => $campaign
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error("Error in updating campaign status [ID: $id]: " . $e->getMessage());
            return response()->json(['error' => 'Failed to update campaign status'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}