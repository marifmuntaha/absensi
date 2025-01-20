<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClockRequest;
use App\Http\Requests\UpdateClockRequest;
use App\Models\Clock;

class ClockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClockRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Clock $clock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clock $clock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClockRequest $request, Clock $clock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clock $clock)
    {
        //
    }
}
