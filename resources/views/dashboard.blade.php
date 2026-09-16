<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Dashboard - AIRA HUB</title>

    @vite([
        'resources/css/app.css',
        'resources/js/app.jsx'
    ])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- ===================================================== -->
    <!-- NAVBAR -->
    <!-- ===================================================== -->

    <nav class="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">

        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <!-- Logo -->
            <a href="/dashboard" class="text-2xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <!-- Messages -->
            <a
                href="/messages"
                class="px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
            >
                💬 Messages
            </a>

            <!-- Profile -->
            <div class="flex items-center gap-4">

                <span class="text-sm text-zinc-400">
                    Welcome 👋
                </span>

                <a
                    href="/profile"
                    class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold hover:bg-indigo-400 transition"
                >
                    A
                </a>

            </div>

        </div>

    </nav>


    <!-- ===================================================== -->
    <!-- MAIN -->
    <!-- ===================================================== -->

    <main class="max-w-7xl mx-auto px-6 py-10">


        <!-- ================================================= -->
        <!-- HERO -->
        <!-- ================================================= -->

        <section class="mb-10">

            <p class="text-indigo-400 font-medium mb-2">
                Welcome to
            </p>

            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                AIRA HUB 🚀
            </h1>

            <p class="text-zinc-400 max-w-2xl text-lg">
                One place to build, learn, create and grow.
                Gunakan AI, temukan pekerjaan, bangun project,
                kembangkan skill, dan temukan peluang baru.
            </p>

        </section>



        <!-- ================================================= -->
        <!-- QUICK ACCESS -->
        <!-- ================================================= -->

        <section class="mt-10 mb-12">

            <h2 class="text-xl font-semibold mb-5">
                Quick Access
            </h2>

            <div class="flex flex-wrap gap-3">


                <!-- AI CHAT -->
                <a
                    href="/chat"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    💬 AI Chat
                </a>


                <!-- JOBS -->
                <a
                    href="/jobs"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    💼 Find Jobs
                </a>


                <!-- SOLUTIONS -->
                <a
                    href="/solutions"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-indigo-500/50 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    🏢 AIRA Solutions
                </a>


                <!-- MY REQUIREMENTS -->
                <a
                    href="/my-requirements"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    📋 My Requirements
                </a>


                <!-- MY OFFERS -->
                <a
                    href="/my-offers"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    🤝 My Offers
                </a>


                <!-- TRANSACTIONS -->
                <a
                    href="/transactions"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    💳 Transactions
                </a>


                <!-- SETTINGS -->
                <a
                    href="/settings"
                    class="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-400 hover:-translate-y-0.5 transition"
                >
                    ⚙️ Settings
                </a>

            </div>

        </section>



        <!-- ================================================= -->
        <!-- MAIN FEATURES -->
        <!-- ================================================= -->

        <section>

            <div class="grid md:grid-cols-2 gap-6">


                <!-- ========================================= -->
                <!-- AIRA AI -->
                <!-- ========================================= -->

                <a
                    href="/robots"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        🤖
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        AIRA AI
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Gunakan AI untuk chat, membuat tulisan,
                        coding, gambar, dan berbagai kebutuhan lainnya.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Mulai menggunakan AI →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- AIRA JOBS -->
                <!-- ========================================= -->

                <a
                    href="/jobs"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        💼
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        AIRA JOBS
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Cari pekerjaan sesuai skill kamu atau
                        pasang pekerjaan untuk menemukan orang yang tepat.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Jelajahi pekerjaan →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- AIRA SOLUTIONS -->
                <!-- ========================================= -->

                <a
                    href="/solutions"
                    class="group bg-zinc-900 border border-indigo-500/30 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        🏢
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        AIRA SOLUTIONS
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Temukan kebutuhan teknologi perusahaan
                        atau tawarkan software, hardware, AI,
                        IoT, dan solusi teknologi yang kamu miliki.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Cari kebutuhan perusahaan →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- PROJECTS -->
                <!-- ========================================= -->

                <a
                    href="/projects"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        📁
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        Projects
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Simpan, kelola, dan kembangkan berbagai
                        project yang kamu buat.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Lihat Projects →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- MY REQUIREMENTS -->
                <!-- ========================================= -->

                <a
                    href="/my-requirements"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        📋
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        My Requirements
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Kelola kebutuhan perusahaan yang kamu posting
                        dan lihat penawaran solusi yang masuk.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Kelola Requirements →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- MY OFFERS -->
                <!-- ========================================= -->

                <a
                    href="/my-offers"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        🤝
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        My Offers
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Lihat semua solusi yang kamu tawarkan
                        kepada perusahaan dan pantau status penawaranmu.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Lihat Penawaran Saya →
                    </span>

                </a>



                <!-- ========================================= -->
                <!-- MESSAGES -->
                <!-- ========================================= -->

                <a
                    href="/messages"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        💬
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        Messages
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Komunikasi dengan pengguna dan perusahaan
                        melalui AIRA HUB.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Buka Messages →
                    </span>

                </a>


                <!-- ========================================= -->
                <!-- PROFILE -->
                <!-- ========================================= -->

                <a
                    href="/profile"
                    class="group bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-indigo-400 hover:-translate-y-1 transition"
                >

                    <div class="text-4xl mb-5">
                        🧑‍💻
                    </div>

                    <h2 class="text-2xl font-semibold mb-2">
                        Profile
                    </h2>

                    <p class="text-zinc-400 mb-6">
                        Kelola informasi diri, skill, portfolio,
                        dan pengalaman pekerjaan kamu.
                    </p>

                    <span class="text-indigo-400 font-medium">
                        Buka Profile →
                    </span>

                </a>

            </div>

        </section>



        <!-- ================================================= -->
        <!-- AIRA SOLUTIONS CTA -->
        <!-- ================================================= -->

        <section class="mt-12">

            <div class="rounded-3xl border border-indigo-500/30 bg-indigo-500/5 p-8 md:p-10">

                <p class="text-indigo-400 font-medium mb-3">
                    AIRA SOLUTIONS
                </p>

                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    Punya kebutuhan teknologi?
                </h2>

                <p class="text-zinc-400 max-w-2xl mb-7">
                    Posting kebutuhan perusahaan kamu dan
                    biarkan solution provider menawarkan solusi
                    yang sesuai.
                </p>

                <div class="flex flex-wrap gap-3">

                    <a
                        href="/solutions"
                        class="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                    >
                        Cari Solusi →
                    </a>

                    <a
                        href="/solutions"
                        class="px-6 py-3 rounded-xl border border-zinc-700 hover:border-indigo-400 transition"
                    >
                        Post Requirement
                    </a>

                </div>

            </div>

        </section>



        <!-- ================================================= -->
        <!-- FOOTER -->
        <!-- ================================================= -->

        <footer class="border-t border-zinc-800 mt-16 pt-6 text-center text-zinc-500 text-sm">

            © {{ date('Y') }} AIRA HUB.
            Build. Learn. Create. Grow.

        </footer>

    </main>

</body>

</html>
