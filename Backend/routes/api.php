<?php

use App\Models\User;
use App\Models\Cihaz;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CihazController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\AdminMiddleware;


// Auth Routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::put('/update-profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/login-debug', [AuthController::class, 'loginDebug']);

});

// Cihaz Routes (Auth gerekli) /* */
Route::middleware(['auth:api'])->group(function () {
    Route::get('/cihazlar', [CihazController::class, 'index']);
    Route::get('/cihazlar/{id}', [CihazController::class, 'show']);
    Route::post('/cihazlar', [CihazController::class, 'store']);
    Route::put('/cihazlar/{id}', [CihazController::class, 'update']);
    Route::delete('/cihazlar/{id}', [CihazController::class, 'destroy']);
    Route::get('/cihazlar/{id}/qr-download', [CihazController::class, 'downloadQr']);
    Route::post('/cihazlar/qr-scan', [CihazController::class, 'scanQR']);
});

Route::middleware('auth:api')->group(function () {
   Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
   Route::get('/dashboard/recent-activity', [DashboardController::class, 'recentActivity']);
});



// Admin Routes                         
Route::middleware(['auth:api', AdminMiddleware::class])->group(function () {
    // Admin sadece erişebilir
    Route::get('/admin/users', [AuthController::class, 'getAllUsers']);
    Route::post('/admin/users', [AuthController::class, 'createUser']);
    Route::get('/admin/users/{id}', [AuthController::class, 'getUser']);
    Route::put('/admin/users/{id}', [AuthController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AuthController::class, 'deleteUser']);
});

// User Routes
Route::group(['middleware' => ['auth:api', 'user']], function () {
    // Hem admin hem user erişebilir
});