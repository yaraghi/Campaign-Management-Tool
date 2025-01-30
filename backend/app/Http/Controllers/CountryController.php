<?php

namespace App\Http\Controllers;
use App\Models\Country;
use Illuminate\Http\Response;


class CountryController extends Controller
{
    public function index()
    {
        try {
            $countries = Country::orderBy('name')->get();
            return response()->json($countries, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch countries'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
