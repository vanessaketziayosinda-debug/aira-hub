<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>AIRA JOBS</title>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/dashboard" class="text-2xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <a
                href="/dashboard"
                class="text-sm text-zinc-400 hover:text-white transition"
            >
                ← Dashboard
            </a>

        </div>
    </nav>


    <!-- Main -->
    <main class="max-w-7xl mx-auto px-6 py-12">

        <!-- Hero -->
        <section class="mb-12">

            <p class="text-indigo-400 font-medium mb-3">
                💼 AIRA JOBS
            </p>

            <h1 class="text-4xl md:text-5xl font-bold mb-5">
                Temukan pekerjaan yang cocok untukmu.
            </h1>

            <p class="text-zinc-400 text-lg max-w-2xl">
                Cari pekerjaan berdasarkan skill, bidang,
                budget, dan kebutuhan kamu.
            </p>

        </section>


        <!-- Search -->
        <section class="mb-10">

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                <div class="flex flex-col md:flex-row gap-4">

                    <input
                        type="text"
                        placeholder="🔎 Cari pekerjaan atau skill..."
                        class="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-400"
                    />

                    <select
                        class="bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-400"
                    >
                        <option>Semua kategori</option>
                        <option>Web Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                        <option>Video Editing</option>
                        <option>Data Entry</option>
                        <option>AI</option>
                        <option>Marketing</option>
                    </select>

                    <button
                        class="bg-indigo-500 hover:bg-indigo-400 px-7 py-4 rounded-xl font-semibold transition"
                    >
                        Cari
                    </button>

                </div>

            </div>

        </section>


        <!-- Categories -->
        <section class="mb-12">

            <h2 class="text-xl font-semibold mb-5">
                Cari berdasarkan bidang
            </h2>

            <div class="flex flex-wrap gap-3">

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    💻 Web Development
                </button>

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    🎨 Design
                </button>

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    ✍️ Writing
                </button>

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    🎬 Video Editing
                </button>

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    🤖 AI
                </button>

                <button class="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-400 transition">
                    📢 Marketing
                </button>

            </div>

        </section>


        <!-- Jobs -->
        <section>

            <div class="flex items-center justify-between mb-6">

                <div>
                    <h2 class="text-2xl font-semibold">
                        Pekerjaan terbaru
                    </h2>

                    <p class="text-zinc-500 mt-1">
                        Temukan peluang yang sesuai dengan skill kamu.
                    </p>
                </div>

                <span class="text-sm text-zinc-500">
                    3 pekerjaan
                </span>

            </div>


            <div class="grid lg:grid-cols-3 gap-6">

                <!-- Job 1 -->
                <article class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-indigo-400 transition">

                    <div class="flex justify-between items-start mb-5">

                        <span class="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full">
                            Web Development
                        </span>

                        <span class="text-xs text-zinc-500">
                            Remote
                        </span>

                    </div>

                    <h3 class="text-xl font-semibold mb-3">
                        Laravel + React Developer
                    </h3>

                    <p class="text-zinc-400 text-sm mb-6">
                        Membutuhkan developer untuk membuat
                        aplikasi web menggunakan Laravel dan React.
                    </p>

                    <div class="space-y-2 text-sm text-zinc-400 mb-6">

                        <div>
                            💰 Rp2.000.000 – Rp4.000.000
                        </div>

                        <div>
                            ⏰ Deadline 14 hari
                        </div>

                    </div>

                    <button
                        class="w-full bg-indigo-500 hover:bg-indigo-400 py-3 rounded-xl font-semibold transition"
                    >
                        Lihat Detail
                    </button>

                </article>


                <!-- Job 2 -->
                <article class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-indigo-400 transition">

                    <div class="flex justify-between items-start mb-5">

                        <span class="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full">
                            Design
                        </span>

                        <span class="text-xs text-zinc-500">
                            Remote
                        </span>

                    </div>

                    <h3 class="text-xl font-semibold mb-3">
                        UI/UX Designer
                    </h3>

                    <p class="text-zinc-400 text-sm mb-6">
                        Membutuhkan designer untuk membuat
                        desain dashboard aplikasi modern.
                    </p>

                    <div class="space-y-2 text-sm text-zinc-400 mb-6">

                        <div>
                            💰 Rp1.500.000 – Rp3.000.000
                        </div>

                        <div>
                            ⏰ Deadline 10 hari
                        </div>

                    </div>

                    <button
                        class="w-full bg-indigo-500 hover:bg-indigo-400 py-3 rounded-xl font-semibold transition"
                    >
                        Lihat Detail
                    </button>

                </article>


                <!-- Job 3 -->
                <article class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-indigo-400 transition">

                    <div class="flex justify-between items-start mb-5">

                        <span class="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full">
                            AI
                        </span>

                        <span class="text-xs text-zinc-500">
                            Remote
                        </span>

                    </div>

                    <h3 class="text-xl font-semibold mb-3">
                        AI Content Creator
                    </h3>

                    <p class="text-zinc-400 text-sm mb-6">
                        Membutuhkan content creator yang dapat
                        menggunakan AI untuk membuat konten.
                    </p>

                    <div class="space-y-2 text-sm text-zinc-400 mb-6">

                        <div>
                            💰 Rp1.000.000 – Rp2.500.000
                        </div>

                        <div>
                            ⏰ Deadline 7 hari
                        </div>

                    </div>

                    <button
                        class="w-full bg-indigo-500 hover:bg-indigo-400 py-3 rounded-xl font-semibold transition"
                    >
                        Lihat Detail
                    </button>

                </article>

            </div>

        </section>


        <!-- Post Job -->
        <section class="mt-16">

            <div class="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-10">

                <div class="max-w-2xl">

                    <div class="text-4xl mb-5">
                        📢
                    </div>

                    <h2 class="text-3xl font-bold mb-3">
                        Punya pekerjaan untuk orang lain?
                    </h2>

                    <p class="text-zinc-400 mb-7">
                        Posting pekerjaanmu dan temukan orang
                        dengan skill yang sesuai.
                    </p>

                    <button
                        class="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Post a Job →
                    </button>

                </div>

            </div>

        </section>


        <!-- Footer -->
        <footer class="border-t border-zinc-800 mt-16 pt-6 text-center text-zinc-500 text-sm">
            © {{ date('Y') }} AIRA HUB
        </footer>

    </main>

</body>
</html>
