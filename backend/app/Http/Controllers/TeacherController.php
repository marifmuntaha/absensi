<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $teachers = new Teacher();
        $teachers = $request->has('month') ? $teachers->whereRelation('present', function ($query) use ($request) {
            $query->whereMonth('date', $request->month);
        }) : $teachers;
        $teachers = $teachers->orderBy('name', 'ASC');
        return response([
            'success' => true,
            'message' => null,
            'result' => TeacherResource::collection($teachers->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        try {
            if ($teacher = Teacher::create($request->all())) {
                $qrcode = QrCode::format('png')->size(400)->generate($teacher->toJson());
                Storage::disk('public')->put('/public/images/qr/'. $teacher->id .'.png', $qrcode);
                return response([
                    'success' => true,
                    'message' => "Data Guru/Karyawan berhasil ditambahkan",
                    'result' => new TeacherResource($teacher)
                ]);
            } else {
                throw new Exception("Data Guru/Karyawan gagal ditambahkan");
            }
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
    public function show(Teacher $teacher)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new TeacherResource($teacher)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        try {
            return $teacher->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Guru/Karyawan berhasil diubah",
                    'result' => new TeacherResource($teacher)
                ]) : throw new Exception("Data Guru/Karyawan gagal diubah");
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
    public function destroy(Teacher $teacher)
    {
        try {
            return $teacher->delete()
                ? response([
                    'success' => true,
                    'message' => "Data Guru/Karyawan berhasil dihapus",
                    'result' => new TeacherResource($teacher)
                ]) : throw new Exception("Data Guru/Karyawan gagal dihapus");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
