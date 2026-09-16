<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Transactions — AIRA HUB</title>

    @vite('resources/css/app.css')
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/" class="text-2xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <div class="flex items-center gap-3">

                <a href="/dashboard"
                    class="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
                    ← Dashboard
                </a>

                <a href="/logout"
                    class="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
                    Logout
                </a>

            </div>

        </div>
    </nav>


    <!-- Main -->
    <main class="max-w-7xl mx-auto px-6 py-12">

        <!-- Header -->
        <div class="mb-10">

            <span
                class="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                💳 AIRA HUB
            </span>

            <h1 class="text-4xl md:text-5xl font-bold mt-5">
                Transactions
            </h1>

            <p class="text-zinc-400 mt-4 max-w-2xl">
                Kelola dan pantau seluruh aktivitas transaksi
                yang terjadi di AIRA HUB.
            </p>

        </div>


        <!-- Financial Summary -->
        <section class="grid md:grid-cols-3 gap-5 mb-10">

            <!-- Balance -->
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <div class="flex items-center justify-between">

                    <div>
                        <p class="text-sm text-zinc-500">
                            Available Balance
                        </p>

                        <h2 class="text-3xl font-bold mt-2">
                            Rp0
                        </h2>
                    </div>

                    <div
                        class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                        💰
                    </div>

                </div>

            </div>


            <!-- Income -->
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <div class="flex items-center justify-between">

                    <div>
                        <p class="text-sm text-zinc-500">
                            Total Income
                        </p>

                        <h2 class="text-3xl font-bold mt-2">
                            Rp0
                        </h2>
                    </div>

                    <div
                        class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                        📥
                    </div>

                </div>

            </div>


            <!-- Spending -->
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <div class="flex items-center justify-between">

                    <div>
                        <p class="text-sm text-zinc-500">
                            Total Spending
                        </p>

                        <h2 class="text-3xl font-bold mt-2">
                            Rp0
                        </h2>
                    </div>

                    <div
                        class="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
                        📤
                    </div>

                </div>

            </div>

        </section>


        <!-- Transaction History -->
        <section class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

            <div class="p-7 border-b border-zinc-800">

                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h2 class="text-2xl font-bold">
                            Transaction History
                        </h2>

                        <p class="text-zinc-500 text-sm mt-2">
                            Semua aktivitas pembayaran AIRA HUB.
                        </p>

                    </div>

                    <button
                        class="px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
                        Filter
                    </button>

                </div>

            </div>


            <!-- Empty State -->
            <div class="p-12 md:p-20 text-center">

                <div class="text-6xl mb-6">
                    🧾
                </div>

                <h3 class="text-2xl font-bold">
                    Belum ada transaksi
                </h3>

                <p class="text-zinc-500 max-w-md mx-auto mt-3 leading-relaxed">
                    Saat kamu melakukan pembelian, menerima pembayaran
                    pekerjaan, atau melakukan transaksi lainnya,
                    riwayatnya akan muncul di sini.
                </p>

            </div>

        </section>


        <!-- Transaction Types -->
        <section class="mt-12">

            <h2 class="text-2xl font-bold mb-6">
                AIRA HUB Payments
            </h2>

            <div class="grid md:grid-cols-4 gap-4">

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                    <div class="text-2xl mb-3">
                        💼
                    </div>

                    <h3 class="font-semibold">
                        AIRA JOBS
                    </h3>

                    <p class="text-sm text-zinc-500 mt-2">
                        Pembayaran pekerjaan dan penghasilan freelancer.
                    </p>

                </div>


                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                    <div class="text-2xl mb-3">
                        🤖
                    </div>

                    <h3 class="font-semibold">
                        AI & Robots
                    </h3>

                    <p class="text-sm text-zinc-500 mt-2">
                        Pembelian AI tools dan software robot.
                    </p>

                </div>


                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                    <div class="text-2xl mb-3">
                        📁
                    </div>

                    <h3 class="font-semibold">
                        Projects
                    </h3>

                    <p class="text-sm text-zinc-500 mt-2">
                        Pembayaran yang berkaitan dengan project.
                    </p>

                </div>


                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                    <div class="text-2xl mb-3">
                        💳
                    </div>

                    <h3 class="font-semibold">
                        Other
                    </h3>

                    <p class="text-sm text-zinc-500 mt-2">
                        Transaksi lain dalam ekosistem AIRA HUB.
                    </p>

                </div>

            </div>

        </section>

    </main>


    <!-- Footer -->
    <footer class="border-t border-zinc-800 mt-10">

        <div class="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
            © 2026 AIRA HUB. All rights reserved.
        </div>

    </footer>

</body>

</html>
