<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreYearRequest;
use App\Http\Requests\UpdateYearRequest;
use App\Http\Resources\YearResource;
use App\Models\Year;
use Exception;
use Illuminate\Http\Request;

class YearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $years = new Year();
        $years = $request->has('active') ? $years->whereActive('1') : $years;
        $years = $request->has('year_id') ? $years->whereId($request->input('year_id')) : $years;
        return response([
            'success' => true,
            'message' => null,
            'result' => YearResource::collection($years->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreYearRequest $request)
    {
        try {
            return ($year = Year::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Tahun berhasil ditambahkan.",
                    'result' => new YearResource($year),
                ], 201) : throw new Exception("Data Tahun gagal ditambahkan.");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Year $year)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new YearResource($year),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateYearRequest $request, Year $year)
    {
        try {
            return $year->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Tahun berhasil diubah.",
                    'result' => new YearResource($year),
                ]) : throw new Exception("Data Tahun gagal diubah.");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Year $year)
    {
        try {
            return $year->delete()
                ? response([
                    'success' => true,
                    'message' => "Data Tahun berhasil dihapus.",
                    'result' => new YearResource($year),
                ]) : throw new Exception("Data Tahun gagal dihapus.");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], $e->getCode());
        }
    }
}
