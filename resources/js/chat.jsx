import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import { createRoot } from "react-dom/client";


function Chat() {

    /*
    |--------------------------------------------------------------------------
    | URL
    |--------------------------------------------------------------------------
    */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const initialUserId =
        params.get("user");


    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [currentUser, setCurrentUser] =
        useState(null);

    const [conversations, setConversations] =
        useState([]);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [messagesLoading, setMessagesLoading] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [error, setError] =
        useState("");

    /*
    |--------------------------------------------------------------------------
    | TOTAL UNREAD
    |--------------------------------------------------------------------------
    */

    const [unreadCount, setUnreadCount] =
        useState(0);


    /*
    |--------------------------------------------------------------------------
    | REF
    |--------------------------------------------------------------------------
    */

    const messagesEndRef =
        useRef(null);


    /*
    |--------------------------------------------------------------------------
    | CHECK AUTH
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        checkAuth();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | LOAD CONVERSATIONS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (currentUser) {

            loadConversations();

            loadUnreadCount();

        }

    }, [currentUser]);


    /*
    |--------------------------------------------------------------------------
    | OPEN CHAT FROM URL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            initialUserId &&
            currentUser
        ) {

            loadMessages(
                initialUserId
            );

        }

    }, [
        initialUserId,
        currentUser
    ]);


    /*
    |--------------------------------------------------------------------------
    | AUTO SCROLL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    /*
    |--------------------------------------------------------------------------
    | AUTO REFRESH UNREAD
    |--------------------------------------------------------------------------
    |
    | Cek pesan baru setiap 5 detik.
    |
    */

    useEffect(() => {

        if (!currentUser) {
            return;
        }

        const interval =
            setInterval(() => {

                loadUnreadCount();

                loadConversations();

            }, 5000);


        return () => {

            clearInterval(interval);

        };

    }, [currentUser]);


    /*
    |--------------------------------------------------------------------------
    | CHECK AUTH
    |--------------------------------------------------------------------------
    */

    async function checkAuth() {

        try {

            const response =
                await fetch(
                    "/api/auth-check",
                    {
                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data?.user
            ) {

                window.location.href =
                    "/login";

                return;
            }


            setCurrentUser(
                data.user
            );

        } catch {

            window.location.href =
                "/login";

        }

    }


    /*
    |--------------------------------------------------------------------------
    | LOAD CONVERSATIONS
    |--------------------------------------------------------------------------
    */

    async function loadConversations() {

        try {

            const response =
                await fetch(
                    "/api/chat/conversations",
                    {
                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Gagal mengambil percakapan."
                );

            }


            setConversations(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            setError(
                err.message ||
                "Gagal mengambil percakapan."
            );

        } finally {

            setLoading(false);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | LOAD UNREAD COUNT
    |--------------------------------------------------------------------------
    */

    async function loadUnreadCount() {

        try {

            const response =
                await fetch(
                    "/api/chat/unread-count",
                    {
                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                return;

            }


            setUnreadCount(
                Number(
                    data?.unread || 0
                )
            );

        } catch {

            /*
             * Jangan tampilkan error
             * agar polling tidak mengganggu
             * chat utama.
             */

        }

    }


    /*
    |--------------------------------------------------------------------------
    | LOAD MESSAGES
    |--------------------------------------------------------------------------
    */

    async function loadMessages(
        userId
    ) {

        try {

            setMessagesLoading(true);

            setError("");


            const response =
                await fetch(
                    `/api/chat/messages/${userId}`,
                    {
                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Gagal mengambil pesan."
                );

            }


            /*
            |--------------------------------------------------------------------------
            | USER YANG DIAJAK CHAT
            |--------------------------------------------------------------------------
            */

            setSelectedUser(
                data.user
            );


            /*
            |--------------------------------------------------------------------------
            | PESAN
            |--------------------------------------------------------------------------
            */

            setMessages(
                Array.isArray(
                    data.messages
                )
                    ? data.messages
                    : []
            );


            /*
            |--------------------------------------------------------------------------
            | UPDATE URL
            |--------------------------------------------------------------------------
            */

            const url =
                new URL(
                    window.location.href
                );


            url.searchParams.set(
                "user",
                userId
            );


            window.history.replaceState(
                {},
                "",
                url
            );


            /*
            |--------------------------------------------------------------------------
            | REFRESH UNREAD
            |--------------------------------------------------------------------------
            |
            | Backend sudah menandai pesan
            | dari user tersebut sebagai read.
            |
            */

            await loadUnreadCount();

            await loadConversations();

        } catch (err) {

            setError(
                err.message ||
                "Gagal mengambil pesan."
            );

        } finally {

            setMessagesLoading(false);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | SEND MESSAGE
    |--------------------------------------------------------------------------
    */

    async function sendMessage(e) {

        e.preventDefault();


        const text =
            message.trim();


        if (
            !text ||
            !selectedUser ||
            sending
        ) {

            return;

        }


        try {

            setSending(true);

            setError("");


            const response =
                await fetch(
                    "/api/chat/messages",
                    {
                        credentials:
                            "same-origin",

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Accept:
                                "application/json",

                        },

                        body:
                            JSON.stringify({

                                receiver_id:
                                    selectedUser.id,

                                message:
                                    text,

                            }),

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Pesan gagal dikirim."
                );

            }


            /*
            |--------------------------------------------------------------------------
            | TAMBAHKAN PESAN KE UI
            |--------------------------------------------------------------------------
            */

            if (data?.data) {

                setMessages(
                    (current) => [

                        ...current,

                        data.data,

                    ]
                );

            }


            /*
            |--------------------------------------------------------------------------
            | KOSONGKAN INPUT
            |--------------------------------------------------------------------------
            */

            setMessage("");


            /*
            |--------------------------------------------------------------------------
            | REFRESH SIDEBAR
            |--------------------------------------------------------------------------
            */

            await loadConversations();

            await loadUnreadCount();

        } catch (err) {

            setError(
                err.message ||
                "Terjadi kesalahan saat mengirim pesan."
            );

        } finally {

            setSending(false);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | ENTER TO SEND
    |--------------------------------------------------------------------------
    */

    function handleKeyDown(e) {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage(e);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | FORMAT TIME
    |--------------------------------------------------------------------------
    */

    function formatTime(
        date
    ) {

        if (!date) {
            return "";
        }


        return new Date(
            date
        ).toLocaleTimeString(
            "id-ID",
            {
                hour:
                    "2-digit",

                minute:
                    "2-digit",
            }
        );

    }


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

                <p className="text-zinc-500">

                    Memuat AIRA Messages...

                </p>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="h-screen bg-zinc-950 text-white flex flex-col">


            {/* ============================================================
                NAVBAR
            ============================================================ */}

            <header className="h-16 shrink-0 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">

                <div className="h-full px-6 flex items-center justify-between">


                    {/* LOGO */}

                    <a
                        href="/dashboard"
                        className="text-xl font-bold"
                    >

                        AIRA

                        <span className="text-indigo-400">
                            {" "}HUB
                        </span>

                    </a>


                    {/* NAVIGATION */}

                    <div className="flex items-center gap-3">


                        {/* SOLUTIONS */}

                        <a
                            href="/solutions"
                            className="text-sm text-zinc-400 hover:text-white transition px-3 py-2"
                        >

                            Solutions

                        </a>


                        {/* MESSAGES */}

                        <a
                            href="/messages"
                            className="relative text-sm text-white bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition px-4 py-2 rounded-xl"
                        >

                            💬 Messages


                            {/* UNREAD BADGE */}

                            {unreadCount > 0 && (

                                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-zinc-950">

                                    {unreadCount > 99
                                        ? "99+"
                                        : unreadCount}

                                </span>

                            )}

                        </a>


                        {/* DASHBOARD */}

                        <a
                            href="/dashboard"
                            className="px-4 py-2 rounded-xl border border-zinc-700 hover:border-indigo-400 transition text-sm"
                        >

                            Dashboard

                        </a>

                    </div>

                </div>

            </header>


            {/* ============================================================
                CHAT
            ============================================================ */}

            <main className="flex-1 min-h-0 flex">


                {/* ========================================================
                    SIDEBAR
                ======================================================== */}

                <aside className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">


                    {/* SIDEBAR HEADER */}

                    <div className="p-5 border-b border-zinc-800">

                        <div className="flex items-center justify-between">


                            <div>

                                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest">

                                    AIRA HUB

                                </p>


                                <h1 className="text-2xl font-bold mt-2">

                                    Messages

                                </h1>

                            </div>


                            {/* TOTAL UNREAD */}

                            {unreadCount > 0 && (

                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

                                    <span className="text-xs text-red-400 font-semibold">

                                        {unreadCount} belum dibaca

                                    </span>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* CONVERSATIONS */}

                    <div className="flex-1 overflow-y-auto">


                        {conversations.length === 0 ? (

                            <div className="p-6 text-center">

                                <div className="text-4xl mb-4">

                                    💬

                                </div>


                                <p className="text-zinc-500 text-sm">

                                    Belum ada percakapan.

                                </p>

                            </div>

                        ) : (

                            conversations.map(
                                (conversation) => {

                                    const user =
                                        conversation.user;


                                    const active =
                                        selectedUser?.id ===
                                        user?.id;


                                    const unread =
                                        Number(
                                            conversation.unread ||
                                            0
                                        );


                                    return (

                                        <button
                                            key={user.id}
                                            onClick={() =>
                                                loadMessages(
                                                    user.id
                                                )
                                            }
                                            className={`w-full text-left p-5 border-b border-zinc-900 transition ${
                                                active
                                                    ? "bg-indigo-500/10 border-l-2 border-l-indigo-500"
                                                    : "hover:bg-zinc-900"
                                            }`}
                                        >


                                            {/* USER + BADGE */}

                                            <div className="flex items-center justify-between gap-3">

                                                <p
                                                    className={`font-semibold ${
                                                        unread > 0
                                                            ? "text-white"
                                                            : "text-zinc-200"
                                                    }`}
                                                >

                                                    {user.name}

                                                </p>


                                                {/* UNREAD PER USER */}

                                                {unread > 0 && (

                                                    <span className="shrink-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">

                                                        {unread > 99
                                                            ? "99+"
                                                            : unread}

                                                    </span>

                                                )}

                                            </div>


                                            {/* LAST MESSAGE */}

                                            <p className={`text-sm truncate mt-1 ${
                                                unread > 0
                                                    ? "text-zinc-300 font-medium"
                                                    : "text-zinc-500"
                                            }`}>

                                                {conversation.last_message}

                                            </p>


                                        </button>

                                    );

                                }

                            )

                        )}

                    </div>

                </aside>


                {/* ========================================================
                    CHAT AREA
                ======================================================== */}

                <section className="flex-1 min-w-0 flex flex-col">


                    {!selectedUser ? (

                        /* EMPTY STATE */

                        <div className="flex-1 flex items-center justify-center">

                            <div className="text-center">

                                <div className="text-6xl mb-5">

                                    💬

                                </div>


                                <h2 className="text-2xl font-bold">

                                    AIRA Messages

                                </h2>


                                <p className="text-zinc-500 mt-2">

                                    Pilih percakapan untuk mulai berkomunikasi.

                                </p>

                            </div>

                        </div>

                    ) : (

                        <>


                            {/* ==================================================
                                CHAT HEADER
                            ================================================== */}

                            <div className="h-20 shrink-0 border-b border-zinc-800 px-6 flex items-center justify-between">


                                <div>

                                    <h2 className="font-semibold text-lg">

                                        {selectedUser.name}

                                    </h2>


                                    <p className="text-xs text-zinc-500">

                                        AIRA HUB Messages

                                    </p>

                                </div>


                                {/* STATUS */}

                                <div className="flex items-center gap-2 text-xs text-zinc-500">

                                    <span className="w-2 h-2 bg-green-500 rounded-full" />

                                    Conversation

                                </div>

                            </div>


                            {/* ==================================================
                                ERROR
                            ================================================== */}

                            {error && (

                                <div className="mx-6 mt-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-sm text-red-300">

                                    {error}

                                </div>

                            )}


                            {/* ==================================================
                                MESSAGES
                            ================================================== */}

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">


                                {messagesLoading ? (

                                    <div className="text-center text-zinc-500 py-10">

                                        Memuat pesan...

                                    </div>

                                ) : messages.length === 0 ? (

                                    <div className="text-center text-zinc-600 py-20">

                                        Belum ada pesan.

                                        <br />

                                        Mulai percakapan.

                                    </div>

                                ) : (

                                    messages.map(
                                        (item) => {

                                            const mine =
                                                Number(
                                                    item.sender_id
                                                ) ===
                                                Number(
                                                    currentUser.id
                                                );


                                            return (

                                                <div
                                                    key={item.id}
                                                    className={`flex ${
                                                        mine
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >

                                                    <div
                                                        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                                                            mine
                                                                ? "bg-indigo-500 text-white rounded-br-md"
                                                                : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-md"
                                                        }`}
                                                    >

                                                        {/* MESSAGE */}

                                                        <p className="whitespace-pre-wrap break-words">

                                                            {item.message}

                                                        </p>


                                                        {/* TIME */}

                                                        <p
                                                            className={`text-[10px] mt-2 ${
                                                                mine
                                                                    ? "text-indigo-100/70"
                                                                    : "text-zinc-600"
                                                            }`}
                                                        >

                                                            {formatTime(
                                                                item.created_at
                                                            )}

                                                        </p>

                                                    </div>

                                                </div>

                                            );

                                        }

                                    )

                                )}


                                <div
                                    ref={
                                        messagesEndRef
                                    }
                                />

                            </div>


                            {/* ==================================================
                                INPUT
                            ================================================== */}

                            <form
                                onSubmit={
                                    sendMessage
                                }
                                className="shrink-0 border-t border-zinc-800 p-4"
                            >

                                <div className="flex items-end gap-3">


                                    <textarea
                                        value={
                                            message
                                        }
                                        onChange={(e) =>
                                            setMessage(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={
                                            handleKeyDown
                                        }
                                        rows="1"
                                        maxLength={5000}
                                        placeholder="Tulis pesan..."
                                        className="flex-1 resize-none rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 outline-none focus:border-indigo-500 transition"
                                    />


                                    <button
                                        type="submit"
                                        disabled={
                                            sending ||
                                            !message.trim()
                                        }
                                        className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition"
                                    >

                                        {sending
                                            ? "..."
                                            : "Kirim"}

                                    </button>

                                </div>


                                <p className="text-[11px] text-zinc-600 mt-2 px-2">

                                    Enter untuk mengirim · Shift + Enter untuk baris baru

                                </p>

                            </form>

                        </>

                    )}

                </section>

            </main>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| REACT ROOT
|--------------------------------------------------------------------------
*/

const rootElement =
    document.getElementById(
        "chat-app"
    );


if (rootElement) {

    createRoot(
        rootElement
    ).render(

        <Chat />

    );

}
