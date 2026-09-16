<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Robot;
use App\Http\Controllers\SolutionOfferController;


/*
|--------------------------------------------------------------------------
| PUBLIC WEBSITE
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('aira hub');
});


/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

// Halaman Login
Route::get('/login', function () {
    return view('auth');
})->name('login');


// Proses Login
Route::post('/login', function (Request $request) {

    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Email atau password salah.',
        ], 401);
    }

    auth()->login($user);

    $request->session()->regenerate();

    return response()->json([
        'success' => true,
        'redirect' => '/dashboard',
    ]);
});


// Halaman Register
Route::get('/register', function () {
    return view('auth');
});


// Proses Register
Route::post('/register', function (Request $request) {

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),

        // Semua pendaftar biasa menjadi customer
        'role' => 'customer',
    ]);

    auth()->login($user);

    $request->session()->regenerate();

    return response()->json([
        'success' => true,
        'redirect' => '/dashboard',
    ]);
});


// Logout
Route::get('/logout', function (Request $request) {

    auth()->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
});


/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {

    if (auth()->user()->role === 'admin') {
        return view('admin.dashboard');
    }

    return view('dashboard');

})->middleware('auth');


/*
|--------------------------------------------------------------------------
| AIRA AI
|--------------------------------------------------------------------------
*/

Route::get('/robot', function () {
    return view('robot');
});


Route::get('/chat', function () {
    return view('chat');
});


/*
|--------------------------------------------------------------------------
| AIRA JOBS
|--------------------------------------------------------------------------
*/

Route::get('/jobs', function () {
    return view('jobs');
});


Route::get('/jobs/{id}', function ($id) {
    return view('job-detail', [
        'id' => $id
    ]);
});


/*
|--------------------------------------------------------------------------
| ROBOT STORE
|--------------------------------------------------------------------------
*/

Route::get('/robots', function () {

    $robots = Robot::where('is_active', true)->get();

    return view('robots', compact('robots'));

});


Route::get('/robots/{id}', function ($id) {

    $robot = Robot::findOrFail($id);

    return view('robot-detail', compact('robot'));

});


/*
|--------------------------------------------------------------------------
| AIRA CAREER QUEST
|--------------------------------------------------------------------------
*/

Route::get('/career-quest', function () {
    return view('career-quest');
})->middleware('auth');

Route::get('/docs', function () {
    return view('docs');
});

Route::get('/projects', function () {
    return view('projects');
})->middleware('auth');

Route::get('/settings', function () {
    return view('settings');
});

Route::get('/settings', function () {
    return view('settings');
});


Route::get('/transactions', function () {
    return view('transactions');
});

Route::get('/profile', function () {
    return view('profile');
});

Route::get('/solutions', function () {
    return view('solutions');
});

Route::middleware('auth')->get('/my-requirements', function () {
    return view('my-requirements');
});

Route::middleware('auth')->get('/my-offers', function () {
    return view('my-offers');
});

/*
|--------------------------------------------------------------------------
| AIRA MESSAGES
|--------------------------------------------------------------------------
*/

Route::get('/messages', function () {
    return view('messages');
})->middleware('auth');
