<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Settings — AIRA HUB</title>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/" class="text-2xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <a href="/dashboard"
                class="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
                ← Dashboard
            </a>

        </div>
    </nav>


    <!-- Main -->
    <main class="max-w-6xl mx-auto px-6 py-12">

        <div class="mb-10">
            <span class="text-sm text-indigo-400 font-medium">
                AIRA HUB
            </span>

            <h1 class="text-4xl md:text-5xl font-bold mt-2">
                Settings
            </h1>

            <p class="text-zinc-400 mt-4">
                Kelola akun, keamanan, dan preferensi AIRA HUB kamu.
            </p>
        </div>


        <div class="grid lg:grid-cols-[220px_1fr] gap-8">

            <!-- Sidebar -->
            <aside>

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-3">

                    <a href="#account"
                        class="block px-4 py-3 rounded-xl bg-zinc-800 text-white">
                        👤 Account
                    </a>

                    <a href="#security"
                        class="block px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
                        🔐 Security
                    </a>

                    <a href="#notifications"
                        class="block px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
                        🔔 Notifications
                    </a>

                </div>

            </aside>


            <!-- Content -->
            <section class="space-y-8">

               <!-- Account -->
<div id="account"
    class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

    <div class="flex items-center gap-4 mb-8">

        <div
            class="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
            👤
        </div>

        <div>
            <h2 class="text-2xl font-bold">
                Account
            </h2>

            <p class="text-zinc-500 mt-1">
                Kelola informasi akun AIRA HUB kamu.
            </p>
        </div>

    </div>


    <!-- Profile Preview -->
    <div
        class="flex flex-col sm:flex-row sm:items-center gap-5 p-5 mb-8 rounded-2xl bg-zinc-950 border border-zinc-800">

        <div
            class="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">
            {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
        </div>

        <div class="flex-1">

            <h3 class="text-lg font-semibold">
                {{ auth()->user()->name }}
            </h3>

            <p class="text-sm text-zinc-500">
                {{ auth()->user()->email }}
            </p>

        </div>

        <div>
            <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-semibold
                {{ auth()->user()->role === 'admin'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' }}">

                {{ ucfirst(auth()->user()->role) }}

            </span>
        </div>

    </div>


    <!-- Account Information -->
    <div class="space-y-6">

        <div>

            <label class="block text-sm text-zinc-400 mb-2">
                Full Name
            </label>

            <input
                type="text"
                value="{{ auth()->user()->name }}"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3
                text-white outline-none transition
                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >

        </div>


        <div>

            <label class="block text-sm text-zinc-400 mb-2">
                Email Address
            </label>

            <input
                type="email"
                value="{{ auth()->user()->email }}"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3
                text-white outline-none transition
                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >

        </div>


        <div>

            <label class="block text-sm text-zinc-400 mb-2">
                Account Role
            </label>

            <input
                type="text"
                value="{{ ucfirst(auth()->user()->role) }}"
                disabled
                class="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3
                text-zinc-500 cursor-not-allowed"
            >

            <p class="text-xs text-zinc-600 mt-2">
                Role akun dikelola oleh sistem AIRA HUB.
            </p>

        </div>


        <div class="pt-2">

            <button
                type="button"
                class="px-6 py-3 rounded-xl bg-indigo-500
                hover:bg-indigo-400 transition font-semibold">
                Save Changes
            </button>

        </div>

    </div>

</div>
                <!-- Security -->
                <div id="security"
                    class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                    <h2 class="text-2xl font-bold">
                        Security
                    </h2>

                    <p class="text-zinc-500 mt-2 mb-6">
                        Lindungi akun AIRA HUB kamu.
                    </p>

                    <div class="flex items-center justify-between gap-4 py-4 border-b border-zinc-800">

                        <div>
                            <h3 class="font-semibold">
                                Password
                            </h3>

                            <p class="text-sm text-zinc-500 mt-1">
                                Ubah password akun kamu secara berkala.
                            </p>
                        </div>

                        <button
                            class="px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
                            Change
                        </button>

                    </div>

                    <div class="flex items-center justify-between gap-4 py-4">

                        <div>
                            <h3 class="font-semibold">
                                Login Sessions
                            </h3>

                            <p class="text-sm text-zinc-500 mt-1">
                                Kelola sesi login akun kamu.
                            </p>
                        </div>

                        <button
                            class="px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
                            Manage
                        </button>

                    </div>

                </div>


                <!-- Notifications -->
                <div id="notifications"
                    class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                    <h2 class="text-2xl font-bold">
                        Notifications
                    </h2>

                    <p class="text-zinc-500 mt-2 mb-6">
                        Atur notifikasi yang ingin kamu terima.
                    </p>

                    <div class="space-y-5">

                        <label class="flex items-center justify-between gap-4">

                            <div>
                                <h3 class="font-semibold">
                                    Job Notifications
                                </h3>

                                <p class="text-sm text-zinc-500 mt-1">
                                    Dapatkan informasi tentang pekerjaan baru.
                                </p>
                            </div>

                            <input type="checkbox" checked class="w-5 h-5">
                        </label>


                        <label class="flex items-center justify-between gap-4">

                            <div>
                                <h3 class="font-semibold">
                                    Messages
                                </h3>

                                <p class="text-sm text-zinc-500 mt-1">
                                    Beri tahu ketika ada pesan baru.
                                </p>
                            </div>

                            <input type="checkbox" checked class="w-5 h-5">
                        </label>


                        <label class="flex items-center justify-between gap-4">

                            <div>
                                <h3 class="font-semibold">
                                    AIRA Updates
                                </h3>

                                <p class="text-sm text-zinc-500 mt-1">
                                    Informasi mengenai fitur dan pembaruan AIRA HUB.
                                </p>
                            </div>

                            <input type="checkbox" checked class="w-5 h-5">
                        </label>

                    </div>

                </div>

            </section>

        </div>

    </main>


    <!-- Footer -->
    <footer class="border-t border-zinc-800 mt-10">

        <div class="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
            © 2026 AIRA HUB. All rights reserved.
        </div>

    </footer>

</body>

</html>
