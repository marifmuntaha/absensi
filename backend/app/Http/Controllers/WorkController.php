<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkRequest;
use App\Http\Requests\UpdateWorkRequest;
use App\Http\Resources\WorkResource;
use App\Models\Work;
use Exception;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $works = new Work();
        return response([
            'status' => true,
            'message' => null,
            'result' => WorkResource::collection($works->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkRequest $request)
    {
        try {
            return ($work = Work::create($request->all()))
                ? response([
                    'status' => true,
                    'message' => "Data Jam Kerja Berhasil Disimpan",
                    'result' => new WorkResource($work),
                ], 201) : throw new Exception("Data Jam Kerja Gagal Disimpan");
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
    public function show(Work $work)
    {
        return response([
            'status' => true,
            'message' => null,
            'result' => new WorkResource($work),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkRequest $request, Work $work)
    {
        try {
            return $work->update(array_filter($request->all()))
                ? response([
                    'status' => true,
                    'message' => "Data Jam Kerja Berhasil Diperbarui",
                    'result' => new WorkResource($work),
                ]) : throw new Exception("Data Jam Kerja Gagal Diperbarui");
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
    public function destroy(Work $work)
    {
        try {
            return $work->delete()
                ? response([
                    'status' => true,
                    'message' => "Data Jam Kerja Berhasil Dihapus",
                    'result' => new WorkResource($work),
                ]) : throw new Exception("Data Jam Kerja Gagal Dihapus");
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
