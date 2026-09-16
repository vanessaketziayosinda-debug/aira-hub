<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Mengambil percakapan antara user login
     * dengan user lain.
     */
    public function index(Request $request, User $user)
    {
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        if ((int) $currentUser->id === (int) $user->id) {
            return response()->json([
                'message' => 'Tidak dapat membuka chat dengan diri sendiri.'
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Tandai pesan sebagai sudah dibaca
        |--------------------------------------------------------------------------
        |
        | Hanya pesan yang:
        | - dikirim oleh user yang sedang dibuka chatnya
        | - diterima oleh user yang sedang login
        | - read_at masih NULL
        |
        | yang akan ditandai sudah dibaca.
        |
        */

        Message::where('sender_id', $user->id)
            ->where('receiver_id', $currentUser->id)
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
            ]);

        /*
        |--------------------------------------------------------------------------
        | Ambil semua pesan dalam percakapan
        |--------------------------------------------------------------------------
        */

        $messages = Message::query()
            ->where(function ($query) use ($currentUser, $user) {
                $query
                    ->where('sender_id', $currentUser->id)
                    ->where('receiver_id', $user->id);
            })
            ->orWhere(function ($query) use ($currentUser, $user) {
                $query
                    ->where('sender_id', $user->id)
                    ->where('receiver_id', $currentUser->id);
            })
            ->with([
                'sender:id,name',
                'receiver:id,name',
            ])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'messages' => $messages,
        ]);
    }


    /**
     * Mengirim pesan.
     */
    public function store(Request $request)
    {
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        $validated = $request->validate([
            'receiver_id' => [
                'required',
                'integer',
                'exists:users,id'
            ],

            'message' => [
                'required',
                'string',
                'max:5000'
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Tidak boleh mengirim pesan ke diri sendiri
        |--------------------------------------------------------------------------
        */

        if (
            (int) $validated['receiver_id'] ===
            (int) $currentUser->id
        ) {
            return response()->json([
                'message' =>
                    'Kamu tidak dapat mengirim pesan ke diri sendiri.'
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Simpan pesan
        |--------------------------------------------------------------------------
        |
        | read_at sengaja tidak diisi.
        | NULL berarti pesan belum dibaca oleh penerima.
        |
        */

        $message = Message::create([
            'sender_id' => $currentUser->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => trim($validated['message']),
            'read_at' => null,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Load relasi sender dan receiver
        |--------------------------------------------------------------------------
        */

        $message->load([
            'sender:id,name',
            'receiver:id,name',
        ]);

        return response()->json([
            'message' => 'Pesan berhasil dikirim.',
            'data' => $message,
        ], 201);
    }


    /**
     * Mengambil daftar percakapan user.
     */
    public function conversations(Request $request)
    {
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'message' => 'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        /*
        |--------------------------------------------------------------------------
        | Ambil semua pesan yang berhubungan dengan user login
        |--------------------------------------------------------------------------
        */

        $messages = Message::query()
            ->where(function ($query) use ($currentUser) {
                $query
                    ->where('sender_id', $currentUser->id)
                    ->orWhere('receiver_id', $currentUser->id);
            })
            ->with([
                'sender:id,name',
                'receiver:id,name',
            ])
            ->latest()
            ->get();

        $conversations = [];

        /*
        |--------------------------------------------------------------------------
        | Bentuk daftar percakapan
        |--------------------------------------------------------------------------
        */

        foreach ($messages as $message) {

            $otherUser =
                (int) $message->sender_id ===
                (int) $currentUser->id

                    ? $message->receiver
                    : $message->sender;

            if (!$otherUser) {
                continue;
            }

            /*
            |--------------------------------------------------------------------------
            | Hanya ambil pesan terbaru dari setiap user
            |--------------------------------------------------------------------------
            */

            if (!isset($conversations[$otherUser->id])) {

                /*
                |--------------------------------------------------------------------------
                | Hitung unread dari user tersebut
                |--------------------------------------------------------------------------
                */

                $unreadCount = Message::query()
                    ->where('sender_id', $otherUser->id)
                    ->where('receiver_id', $currentUser->id)
                    ->whereNull('read_at')
                    ->count();

                $conversations[$otherUser->id] = [
                    'user' => [
                        'id' => $otherUser->id,
                        'name' => $otherUser->name,
                    ],

                    'last_message' => $message->message,

                    'updated_at' => $message->created_at,

                    'unread' => $unreadCount,
                ];
            }
        }

        return response()->json(
            array_values($conversations)
        );
    }


    /**
     * Mengambil jumlah seluruh pesan yang belum dibaca.
     */
    public function unreadCount(Request $request)
    {
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'message' =>
                    'Kamu harus login terlebih dahulu.'
            ], 401);
        }

        /*
        |--------------------------------------------------------------------------
        | Hitung semua pesan yang:
        | - ditujukan kepada user login
        | - read_at masih NULL
        |--------------------------------------------------------------------------
        */

        $unread = Message::query()
            ->where(
                'receiver_id',
                $currentUser->id
            )
            ->whereNull('read_at')
            ->count();

        return response()->json([
            'unread' => $unread,
        ]);
    }
}
