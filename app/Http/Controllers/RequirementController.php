<?php

namespace App\Http\Controllers;

use App\Models\Requirement;
use Illuminate\Http\Request;

class RequirementController extends Controller
{
    /**
     * Menampilkan semua requirement.
     */
    public function index()
    {
        return response()->json(
            Requirement::with('user:id,name,email')
                ->latest()
                ->get()
        );
    }

    /**
     * Menampilkan requirement milik user yang sedang login.
     */
    public function myRequirements(Request $request)
    {
        $requirements = $request->user()
            ->requirements()
            ->latest()
            ->get();

        return response()->json($requirements);
    }

    /**
     * Membuat requirement baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'budget' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);

        $requirement = $request->user()
            ->requirements()
            ->create([
                'title' => $validated['title'],
                'company' => $validated['company'],
                'category' => $validated['category'],
                'budget' => $validated['budget'] ?? null,
                'location' => $validated['location'] ?? null,
                'description' => $validated['description'],
                'status' => 'open',
            ]);

        return response()->json([
            'message' => 'Requirement berhasil dibuat.',
            'data' => $requirement,
        ], 201);
    }

    /**
     * Menampilkan satu requirement.
     */
    public function show(Requirement $requirement)
    {
        return response()->json(
            $requirement->load('user:id,name,email')
        );
    }
}
