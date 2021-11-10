<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::prefix('api')->group(function() {
    Route::get('getClients',[ClientController::class, 'getClients']);
    // Add CLient
    Route::post('save_client',[ClientController::class, 'saveClient']);
    // Delete Client
    Route::delete('delete_client/{id}',[ClientController::class, 'deleteClient']);
    // Edit Client
    Route::get('edit_client/{id}',[ClientController::class, 'editClient']);
    // Update Client
    Route::put('update_client',[ClientController::class, 'updateClient']);
});

Route::get('{any}', function () {
    return view('welcome');
})-> where('any','.*');
