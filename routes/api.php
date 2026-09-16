<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\RequirementController;
use App\Http\Controllers\SolutionOfferController;
use App\Http\Controllers\MessageController;


/*
|--------------------------------------------------------------------------
| PUBLIC REQUIREMENTS
|--------------------------------------------------------------------------
*/

// Semua requirement
Route::get('/requirements', [
    RequirementController::class,
    'index'
]);

// Detail requirement
Route::get('/requirements/{requirement}', [
    RequirementController::class,
    'show'
]);


/*
|--------------------------------------------------------------------------
| AUTH CHECK
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'auth'])->get('/auth-check', function (Request $request) {

    return response()->json([
        'authenticated' => true,
        'user' => $request->user(),
    ]);

});


/*
|--------------------------------------------------------------------------
| REQUIREMENTS
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'auth'])->group(function () {

    // Requirement milik user yang sedang login
    Route::get('/my-requirements', [
        RequirementController::class,
        'myRequirements'
    ]);

    // Membuat requirement
    Route::post('/requirements', [
        RequirementController::class,
        'store'
    ]);

});


/*
|--------------------------------------------------------------------------
| SOLUTION OFFERS
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'auth'])->group(function () {

    // =========================================================
    // MY OFFERS
    // =========================================================

    // Semua penawaran yang dibuat oleh user yang sedang login
    Route::get('/my-offers', [
        SolutionOfferController::class,
        'myOffers'
    ]);


    // =========================================================
    // REQUIREMENT OFFERS
    // =========================================================

    // Melihat semua penawaran pada sebuah requirement
    Route::get(
        '/requirements/{requirement}/offers',
        [SolutionOfferController::class, 'index']
    );


    // Membuat penawaran solusi
    Route::post(
        '/requirements/{requirement}/offers',
        [SolutionOfferController::class, 'store']
    );


    // =========================================================
    // ACCEPT OFFER
    // =========================================================

    Route::patch(
        '/requirements/{requirement}/offers/{solutionOffer}/accept',
        [SolutionOfferController::class, 'accept']
    );


    // =========================================================
    // REJECT OFFER
    // =========================================================

    Route::patch(
        '/requirements/{requirement}/offers/{solutionOffer}/reject',
        [SolutionOfferController::class, 'reject']
    );

});

/*
|--------------------------------------------------------------------------
| CHAT
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'auth'])->group(function () {

    // Daftar percakapan
    Route::get(
        '/chat/conversations',
        [MessageController::class, 'conversations']
    );

    // Pesan dalam percakapan
    Route::get(
        '/chat/messages/{user}',
        [MessageController::class, 'index']
    );

    // Kirim pesan
    Route::post(
        '/chat/messages',
        [MessageController::class, 'store']
    );

    // Jumlah pesan belum dibaca
    Route::get(
        '/chat/unread-count',
        [MessageController::class, 'unreadCount']
    );
});
