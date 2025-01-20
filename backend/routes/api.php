<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\PresentController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\YearController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('/master/school', SchoolController::class)->only(['show', 'update']);
    Route::apiResource('/master/year', YearController::class);
    Route::apiResource('/master/semester', SemesterController::class);
    Route::apiResource('/master/holiday', HolidayController::class);
    Route::apiResource('/master/work', WorkController::class);
    Route::apiResource('/present', PresentController::class);
    Route::apiResource('/teacher', TeacherController::class);
    Route::apiResource('/user', UserController::class);
});
