<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSchoolRequest;
use App\Http\Requests\UpdateSchoolRequest;
use App\Http\Resources\SchoolResource;
use App\Models\School;
use Exception;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new SchoolResource($school)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolRequest $request, School $school)
    {
        try {
            if ($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $fileName = $request->id . '.' . $extension;
                $file->storeAs('public/images', $fileName, 'public');
                $request->request->add(['logo' => $fileName]);
            }
            return $school->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Sekolah berhasil diperbarui.",
                    'result' => new SchoolResource($school)
                ]) : throw new Exception("Data Sekolah gagal diperbarui.");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        //
    }
}
