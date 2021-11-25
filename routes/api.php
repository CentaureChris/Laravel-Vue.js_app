<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Create count User
Route::post('register', [AuthController::class, 'register']);
// Login
Route::post('login', [AuthController::class, 'login']);
// Get all Users
Route::get('getUsers',[AuthController::class, 'getUsers']);
// delete User
Route::delete('delete_user/{id}',[AuthController::class, 'deleteUser']);
// editUser
Route::get('edit_user/{id}',[AuthController::class, 'editUser']);
// update
Route::put('update_user',[AuthController::class, 'updateUser']);


