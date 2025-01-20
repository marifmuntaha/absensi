<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePresentRequest;
use App\Http\Requests\UpdatePresentRequest;
use App\Http\Resources\PresentResource;
use App\Models\Present;
use Exception;
use Illuminate\Http\Request;

class PresentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $presents = new Present();
        $presents = $request->has('date') ? $presents->whereDate('date', $request->date) : $presents;
        $presents = $request->has('teacher_id') ? $presents->whereTeacherId($request->input('teacher_id')) : $presents;
        $presents = $request->has('month') ? $presents->whereMonth('date', $request->input('month')) : $presents;
        $presents = $request->has('year') ? $presents->whereYear('date', $request->input('year')) : $presents;
        return response([
            'status' => true,
            'message' => null,
            'result' => PresentResource::collection($presents->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePresentRequest $request)
    {
        try {
            return ($present = Present::create($request->all()))
                ? response([
                    'status' => true,
                    'message' => 'Kehadiran anda berhasil disimpan',
                    'result' => new PresentResource($present),
                ], 201) : throw new Exception('Kehadiran anda gagal disimpan');
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Present $present)
    {
        return response([
            'status' => true,
            'message' => null,
            'result' => new PresentResource($present),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePresentRequest $request, Present $present)
    {
        try {
            return $present->update(array_filter($request->all()))
                ? response([
                    'status' => true,
                    'message' => 'Absensi Pulang anda berhasil diperbarui',
                    'result' => new PresentResource($present),
                ]) : throw new Exception('Absensi Pulang anda gagal disimpan');
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Present $present)
    {
        try {
            return $present->delete()
                ? response([
                    'status' => true,
                    'message' => 'Kehadiran anda berhasil dihapus',
                    'result' => new PresentResource($present),
                ]) : throw new Exception('Kehadiran anda gagal dihapus');
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
