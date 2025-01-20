<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = new User();
        return response([
            'status' => true,
            'message' => null,
            'result' => UserResource::collection($users->get())
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        try {
            return ($user = User::create($request->all()))
                ? response([
                    'status' => true,
                    'message' => "Data Pengguna Berhasil ditambahkan",
                    'result' => new UserResource($user)
                ], 201) : throw new Exception("Data Pengguna Gagal ditambahkan");
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function show(User $user)
    {
        return response([
            'status' => true,
            'message' => null,
            'result' => new UserResource($user)
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            return $user->update(array_filter($request->all())) ? response([
                'status' => true,
                'message' => "Data Pengguna Berhasil diubah",
                'result' => new UserResource($user)
            ]) : throw new Exception("Data Pengguna Gagal diubah");
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function destroy(User $user)
    {
        try {
            return $user->delete()
                ? response([
                    'status' => true,
                    'message' => "Data Pengguna Berhasil dihapus",
                    'result' => new UserResource($user)
                ]) : throw new Exception("Data Pengguna Gagal dihapus");
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
