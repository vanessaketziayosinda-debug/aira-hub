<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Profile — AIRA HUB</title>

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
    <main class="max-w-6xl mx-auto px-6 py-12">

        <!-- Profile Header -->
        <section
            class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 md:p-10 mb-8">

            <div class="flex flex-col md:flex-row md:items-center gap-7">

                <!-- Avatar -->
                <div
                    class="w-28 h-28 rounded-full bg-indigo-500 flex items-center justify-center text-5xl font-bold shrink-0">

                    {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}

                </div>


                <!-- User Info -->
                <div class="flex-1">

                    <div class="flex flex-col sm:flex-row sm:items-center gap-3">

                        <h1 class="text-3xl md:text-4xl font-bold">
                            {{ auth()->user()->name }}
                        </h1>

                        <span
                            class="inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold
                            {{ auth()->user()->role === 'admin'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' }}">

                            {{ ucfirst(auth()->user()->role) }}

                        </span>

                    </div>

                    <p class="text-zinc-500 mt-2">
                        {{ auth()->user()->email }}
                    </p>

                    <p class="text-zinc-400 mt-4 max-w-2xl leading-relaxed">
                        Bangun profile profesionalmu di AIRA HUB.
                        Tambahkan skill, pengalaman, dan portfolio
                        untuk meningkatkan peluang mendapatkan pekerjaan.
                    </p>

                </div>


                <!-- Edit -->
                <a href="/settings#account"
                    class="px-5 py-3 rounded-xl border border-zinc-700
                    hover:bg-zinc-800 transition font-semibold">

                    ✏️ Edit Profile

                </a>

            </div>

        </section>


        <!-- Profile Content -->
        <div class="grid lg:grid-cols-3 gap-6">

            <!-- About -->
            <section
                class="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <h2 class="text-2xl font-bold">
                    About Me
                </h2>

                <p class="text-zinc-500 mt-3 leading-relaxed">
                    Belum ada deskripsi profile.
                    Ceritakan tentang dirimu, pengalamanmu,
                    dan bidang yang kamu kuasai.
                </p>

                <button
                    class="mt-6 px-5 py-3 rounded-xl bg-indigo-500
                    hover:bg-indigo-400 transition font-semibold">

                    + Add Bio

                </button>

            </section>


            <!-- Profile Completion -->
            <section
                class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <h2 class="text-xl font-bold">
                    Profile Completion
                </h2>

                <div class="mt-6">

                    <div class="flex items-center justify-between text-sm mb-2">

                        <span class="text-zinc-400">
                            Progress
                        </span>

                        <span class="text-indigo-400 font-semibold">
                            20%
                        </span>

                    </div>

                    <div class="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">

                        <div
                            class="h-full w-[20%] bg-indigo-500 rounded-full">
                        </div>

                    </div>

                    <p class="text-sm text-zinc-500 mt-4">
                        Lengkapi skill, pengalaman, dan portfolio
                        untuk meningkatkan profile kamu.
                    </p>

                </div>

            </section>


            <!-- Skills -->
            <section
                class="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <div class="flex items-center justify-between gap-4">

                    <div>

                        <h2 class="text-2xl font-bold">
                            Skills
                        </h2>

                        <p class="text-zinc-500 mt-2">
                            Skill yang kamu miliki.
                        </p>

                    </div>

                    <button
                        class="px-4 py-2 rounded-xl border border-zinc-700
                        hover:bg-zinc-800 transition">

                        + Add Skill

                    </button>

                </div>


                <div class="flex flex-wrap gap-3 mt-6">

                    <span
                        class="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400">
                        Belum ada skill
                    </span>

                </div>

            </section>


            <!-- Experience -->
            <section
                class="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <h2 class="text-xl font-bold">
                    Experience
                </h2>

                <p class="text-zinc-500 mt-3 leading-relaxed">
                    Tambahkan pengalaman kerja atau pengalaman project.
                </p>

                <button
                    class="mt-6 px-4 py-2 rounded-xl border border-zinc-700
                    hover:bg-zinc-800 transition">

                    + Add Experience

                </button>

            </section>


            <!-- Portfolio -->
            <section
                class="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h2 class="text-2xl font-bold">
                            Portfolio
                        </h2>

                        <p class="text-zinc-500 mt-2">
                            Tampilkan project terbaikmu kepada client
                            dan employer.
                        </p>

                    </div>

                    <a href="/projects"
                        class="px-5 py-3 rounded-xl bg-indigo-500
                        hover:bg-indigo-400 transition font-semibold">

                        📁 View Projects

                    </a>

                </div>


                <div class="mt-7 border border-dashed border-zinc-800
                    rounded-2xl p-10 text-center">

                    <div class="text-5xl mb-4">
                        📁
                    </div>

                    <h3 class="text-xl font-semibold">
                        Belum ada portfolio
                    </h3>

                    <p class="text-zinc-500 mt-2">
                        Project yang kamu publish akan muncul di sini.
                    </p>

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
