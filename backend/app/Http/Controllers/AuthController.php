<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(StoreLoginRequest $request)
    {
        try {
            return Auth::attempt(['username' => $request->username, 'password' => $request->password])
                ? response([
                    'status' => true,
                    'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik',
                    'result' => Arr::collapse([$request->user()->toArray(), [
                        'token' => $request->user()->createToken($request->username)->plainTextToken,
                    ]])
                ]) : throw new Exception('Akses Ditolak', 403);
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }

    public function logout(Request $request)
    {
        try {
            return $request->user('sanctum')->currentAccessToken()->delete()
                ? response([
                    'status' => true,
                    'message' => 'Berhasil keluar',
                    'result' => null
                ]) : throw new Exception("Terjadi kesalahan server");
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

}
