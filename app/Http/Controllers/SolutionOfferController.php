<?php

namespace App\Http\Controllers;

use App\Models\Requirement;
use App\Models\SolutionOffer;
use Illuminate\Http\Request;

class SolutionOfferController extends Controller
{
    /**
     * Menampilkan semua penawaran untuk sebuah requirement.
     */
    public function index(Requirement $requirement)
    {
        $offers = $requirement->solutionOffers()
            ->with('user:id,name,email')
            ->latest()
            ->get();

        return response()->json($offers);
    }

    /**
     * Menampilkan semua penawaran milik user yang sedang login.
     */
    public function myOffers(Request $request)
    {
        $offers = $request->user()
            ->solutionOffers()
            ->with([
                'requirement:id,user_id,title,company,category,budget,location,status'
            ])
            ->latest()
            ->get();

        return response()->json($offers);
    }

    /**
     * Membuat penawaran solusi.
     */
    public function store(
        Request $request,
        Requirement $requirement
    ) {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        // User tidak boleh menawarkan solusi
        // kepada requirement miliknya sendiri.
        if ((int) $requirement->user_id === (int) $user->id) {
            return response()->json([
                'message' => 'Kamu tidak dapat menawarkan solusi kepada requirement milikmu sendiri.'
            ], 403);
        }

        // Requirement harus masih terbuka.
        if ($requirement->status && $requirement->status !== 'open') {
            return response()->json([
                'message' => 'Requirement ini sudah tidak menerima penawaran.'
            ], 422);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['nullable', 'string', 'max:255'],
            'delivery_time' => ['nullable', 'string', 'max:255'],
        ]);

        $offer = $user->solutionOffers()->create([
            'requirement_id' => $requirement->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'] ?? null,
            'delivery_time' => $validated['delivery_time'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Penawaran solusi berhasil dikirim.',
            'data' => $offer,
        ], 201);
    }

    /**
     * Menampilkan satu penawaran.
     */
    public function show(SolutionOffer $solutionOffer)
    {
        return response()->json(
            $solutionOffer->load(
                'user:id,name,email',
                'requirement'
            )
        );
    }

    /**
     * Menerima penawaran.
     */
    public function accept(
        Request $request,
        Requirement $requirement,
        $solutionOffer
    ) {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        $solutionOffer = SolutionOffer::findOrFail($solutionOffer);

        // Hanya pemilik requirement.
        if ((int) $requirement->user_id !== (int) $user->id) {
            return response()->json([
                'message' => 'Hanya pemilik requirement yang dapat menerima penawaran.'
            ], 403);
        }

        // Pastikan offer memang milik requirement.
        if (
            (int) $solutionOffer->requirement_id !==
            (int) $requirement->id
        ) {
            return response()->json([
                'message' => 'Penawaran tidak terkait dengan requirement ini.'
            ], 404);
        }

        // Hanya pending yang dapat diproses.
        if ($solutionOffer->status !== 'pending') {
            return response()->json([
                'message' => 'Penawaran ini sudah diproses sebelumnya.'
            ], 422);
        }

        $solutionOffer->update([
            'status' => 'accepted',
        ]);

        return response()->json([
            'message' => 'Penawaran berhasil diterima.',
            'data' => $solutionOffer->fresh(),
        ]);
    }

    /**
     * Menolak penawaran.
     */
    public function reject(
        Request $request,
        Requirement $requirement,
        $solutionOffer
    ) {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        $solutionOffer = SolutionOffer::findOrFail($solutionOffer);

        // Hanya pemilik requirement.
        if ((int) $requirement->user_id !== (int) $user->id) {
            return response()->json([
                'message' => 'Hanya pemilik requirement yang dapat menolak penawaran.'
            ], 403);
        }

        // Pastikan offer memang milik requirement.
        if (
            (int) $solutionOffer->requirement_id !==
            (int) $requirement->id
        ) {
            return response()->json([
                'message' => 'Penawaran tidak terkait dengan requirement ini.'
            ], 404);
        }

        // Hanya pending yang dapat diproses.
        if ($solutionOffer->status !== 'pending') {
            return response()->json([
                'message' => 'Penawaran ini sudah diproses sebelumnya.'
            ], 422);
        }

        $solutionOffer->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'message' => 'Penawaran berhasil ditolak.',
            'data' => $solutionOffer->fresh(),
        ]);
    }
}
