<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Projects — AIRA HUB</title>

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
                    class="px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition">
                    Dashboard
                </a>

                <a href="/logout"
                    class="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
                    Logout
                </a>

            </div>

        </div>
    </nav>


    <!-- Main -->
    <main class="max-w-7xl mx-auto px-6 py-14">

        <!-- Header -->
        <section class="mb-12">

            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

                <div>
                    <span
                        class="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
                        📁 AIRA HUB
                    </span>

                    <h1 class="text-4xl md:text-5xl font-bold tracking-tight mt-5">
                        My Projects
                    </h1>

                    <p class="text-zinc-400 mt-4 max-w-2xl leading-relaxed">
                        Tempat untuk menyimpan, mengembangkan, dan
                        menampilkan project yang kamu kerjakan.
                    </p>
                </div>

                <button
                    class="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold">
                    + New Project
                </button>

            </div>

        </section>


        <!-- Project Stats -->
        <section class="grid sm:grid-cols-3 gap-4 mb-10">

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-sm text-zinc-500">
                    Total Projects
                </p>

                <p class="text-3xl font-bold mt-2">
                    0
                </p>
            </div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-sm text-zinc-500">
                    In Progress
                </p>

                <p class="text-3xl font-bold mt-2">
                    0
                </p>
            </div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-sm text-zinc-500">
                    Completed
                </p>

                <p class="text-3xl font-bold mt-2">
                    0
                </p>
            </div>

        </section>


        <!-- Empty State -->
        <section
            class="border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/50 p-12 md:p-20 text-center">

            <div class="text-6xl mb-6">
                📁
            </div>

            <h2 class="text-2xl md:text-3xl font-bold">
                Belum ada project
            </h2>

            <p class="text-zinc-500 max-w-lg mx-auto mt-4 leading-relaxed">
                Mulai buat project pertamamu dan gunakan halaman ini
                untuk menyimpan hasil pekerjaan serta membangun portfolio.
            </p>

            <button
                class="mt-8 px-6 py-3 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition">
                🚀 Buat Project Pertama
            </button>

        </section>


        <!-- Future Features -->
        <section class="mt-14">

            <h2 class="text-2xl font-bold mb-6">
                Project Workflow
            </h2>

            <div class="grid md:grid-cols-4 gap-4">

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div class="text-2xl mb-3">💡</div>
                    <h3 class="font-semibold">
                        Create
                    </h3>
                    <p class="text-sm text-zinc-500 mt-2">
                        Buat project dan tentukan tujuan.
                    </p>
                </div>

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div class="text-2xl mb-3">🛠️</div>
                    <h3 class="font-semibold">
                        Build
                    </h3>
                    <p class="text-sm text-zinc-500 mt-2">
                        Kerjakan dan kembangkan project.
                    </p>
                </div>

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div class="text-2xl mb-3">📤</div>
                    <h3 class="font-semibold">
                        Publish
                    </h3>
                    <p class="text-sm text-zinc-500 mt-2">
                        Tampilkan project sebagai portfolio.
                    </p>
                </div>

                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div class="text-2xl mb-3">💼</div>
                    <h3 class="font-semibold">
                        Get Opportunities
                    </h3>
                    <p class="text-sm text-zinc-500 mt-2">
                        Gunakan portfolio untuk mendapatkan peluang kerja.
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
