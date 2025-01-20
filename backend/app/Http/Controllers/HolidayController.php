<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHolidayRequest;
use App\Http\Requests\UpdateHolidayRequest;
use App\Http\Resources\HolidayResource;
use App\Models\Holiday;
use Exception;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $holidays = new Holiday();
        $holidays = $request->has('semester_id') ? $holidays->whereSemesterId($request->input('semester_id')) : $holidays;
        $holidays = $request->has('month') ? $holidays->whereMonth('date', $request->month) : $holidays;
        $holidays = $request->has('year') ? $holidays->whereYear('date', $request->year) : $holidays;
        $holidays = $holidays->orderBy('date', 'ASC');
        return response([
            'success' => true,
            'message' => null,
            'result' => HolidayResource::collection($holidays->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHolidayRequest $request)
    {
        try {
            return ($holiday = Holiday::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Libur berhasil ditambahkan',
                    'result' => new HolidayResource($holiday)
                ], 201) : throw new Exception('Data Libur gagal ditambahkan');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Holiday $holiday)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new HolidayResource($holiday)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHolidayRequest $request, Holiday $holiday)
    {
        try {
            return $holiday->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Libur berhasil diubah',
                    'result' => new HolidayResource($holiday)
                ]) : throw new Exception('Data Libur gagal diubah');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Holiday $holiday)
    {
        try {
            return $holiday->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Libur berhasil dihapus',
                    'result' => new HolidayResource($holiday)
                ]) : throw new Exception('Data Libur gagal dihapus');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
