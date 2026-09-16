<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Admin Dashboard — AIRA HUB</title>

    @vite('resources/css/app.css')
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <div class="max-w-7xl mx-auto px-6 py-10">

        <!-- Header -->
        <div class="mb-10">
            <h1 class="text-3xl font-bold">
                AIRA HUB — Admin
            </h1>

            <p class="text-zinc-400 mt-2">
                Selamat datang di panel administrasi AIRA HUB 👋
            </p>
        </div>

        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-5">

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p class="text-zinc-400">Users</p>
                <h2 class="text-3xl font-bold mt-2">0</h2>
            </div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p class="text-zinc-400">Jobs</p>
                <h2 class="text-3xl font-bold mt-2">0</h2>
            </div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p class="text-zinc-400">Projects</p>
                <h2 class="text-3xl font-bold mt-2">0</h2>
            </div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p class="text-zinc-400">Transactions</p>
                <h2 class="text-3xl font-bold mt-2">Rp0</h2>
            </div>

        </div>

        <!-- Admin Menu -->
        <div class="mt-10">

            <h2 class="text-xl font-semibold mb-5">
                Admin Management
            </h2>

            <div class="grid md:grid-cols-3 gap-5">

                <a href="#"
                    class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 transition">
                    <div class="text-3xl mb-3">👥</div>
                    <h3 class="font-semibold text-lg">Manage Users</h3>
                    <p class="text-zinc-400 text-sm mt-2">
                        Kelola pengguna AIRA HUB.
                    </p>
                </a>

                <a href="#"
                    class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 transition">
                    <div class="text-3xl mb-3">💼</div>
                    <h3 class="font-semibold text-lg">Manage Jobs</h3>
                    <p class="text-zinc-400 text-sm mt-2">
                        Kelola pekerjaan yang tersedia.
                    </p>
                </a>

                <a href="#"
                    class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 transition">
                    <div class="text-3xl mb-3">🤖</div>
                    <h3 class="font-semibold text-lg">Manage Robots</h3>
                    <p class="text-zinc-400 text-sm mt-2">
                        Kelola AI Robot Store.
                    </p>
                </a>

            </div>

        </div>

        <!-- Back -->
        <div class="mt-10">
            <a href="/" class="text-indigo-400 hover:text-indigo-300">
                ← Kembali ke AIRA HUB
            </a>
        </div>

    </div>

</body>

</html>
