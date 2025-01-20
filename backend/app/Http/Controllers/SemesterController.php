<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Http\Resources\SemesterResource;
use App\Models\Semester;
use Exception;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $semesters = new Semester();
        $semesters = $request->has('year_id') ? $semesters->whereYearId($request->input('year_id')) : $semesters;
        $semesters = $request->has('active') ? $semesters->whereActive('1') : $semesters;
        return response([
            'success' => true,
            'message' => null,
            'result' => SemesterResource::collection($semesters->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSemesterRequest $request)
    {
        try {
            return ($semester = Semester::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Semester berhasil ditambahkan',
                    'result' => new SemesterResource($semester),
                ], 201) : throw new Exception('Data Semester gagal ditambahkan');
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
    public function show(Semester $semester)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new SemesterResource($semester),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSemesterRequest $request, Semester $semester)
    {
        try {
            return $semester->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Semester berhasil diubah',
                    'result' => new SemesterResource($semester),
                ]) : throw new Exception('Data Semester gagal diubah');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Semester $semester)
    {
        try {
            return $semester->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Semester berhasil dihapus',
                    'result' => new SemesterResource($semester),
                ]) : throw new Exception('Data Semester gagal dihapus');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
