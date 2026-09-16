<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>AI Chat - AIRA HUB</title>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800">
        <div class="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/dashboard" class="text-xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <a href="/aira hub" class="text-zinc-400 hover:text-white transition">
                ← Dashboard
            </a>

        </div>
    </nav>


    <!-- Main -->
    <main class="max-w-4xl mx-auto px-6 py-10">

        <!-- Header -->
        <div class="mb-8">

            <div class="flex items-center gap-3 mb-3">

                <div
                    class="w-12 h-12 rounded-2xl
                            bg-indigo-500/10
                            border border-indigo-500/20
                            flex items-center justify-center
                            text-2xl">

                    🤖

                </div>

                <div>
                    <h1 class="text-2xl font-bold">
                        AIRA AI
                    </h1>

                    <p class="text-sm text-green-400">
                        ● Online
                    </p>
                </div>

            </div>

            <p class="text-zinc-400">
                Ngobrol dengan AIRA dan temukan AI Robot
                yang sesuai dengan kebutuhanmu.
            </p>

        </div>


        <!-- Chat Box -->
        <div
            class="bg-zinc-900
                    border border-zinc-800
                    rounded-3xl
                    overflow-hidden">


            <!-- Messages -->
            <div class="p-6 space-y-6 min-h-105">


                <!-- AIRA -->
                <div class="flex gap-3">

                    <div
                        class="w-9 h-9 rounded-xl
                                bg-indigo-500/10
                                flex items-center justify-center
                                shrink-0">

                        🤖

                    </div>

                    <div>

                        <p class="text-sm text-zinc-500 mb-1">
                            AIRA
                        </p>

                        <div
                            class="bg-zinc-800
                                    rounded-2xl
                                    rounded-tl-sm
                                    px-5 py-4
                                    max-w-xl">

                            <p>
                                Halo! 👋 Saya AIRA.
                                Ada yang bisa saya bantu?
                            </p>

                            <p class="mt-3 text-zinc-300">
                                Kalau kamu membutuhkan robot AI
                                untuk pekerjaan atau bisnis,
                                saya juga bisa membantu mencarikannya. 🤖
                            </p>

                        </div>

                    </div>

                </div>


                <!-- Robot Recommendation -->
                <div class="ml-12">

                    <div
                        class="bg-zinc-950
                                border border-indigo-500/20
                                rounded-2xl
                                p-5
                                max-w-xl">

                        <div class="flex items-center gap-3 mb-4">

                            <div class="text-3xl">
                                🤖
                            </div>

                            <div>
                                <p class="text-sm text-indigo-400">
                                    AI ROBOT
                                </p>

                                <h2 class="font-semibold text-lg">
                                    AIRA Customer Service
                                </h2>
                            </div>

                        </div>

                        <p class="text-zinc-400 text-sm">
                            Robot AI yang membantu menjawab pertanyaan
                            pelanggan dan melayani customer secara otomatis.
                        </p>


                        <div class="flex items-center justify-between mt-5">

                            <span class="text-xl font-bold">
                                Rp199.000
                            </span>

                            <button
                                class="bg-indigo-500
                                       hover:bg-indigo-400
                                       px-5 py-2.5
                                       rounded-xl
                                       font-semibold
                                       transition">

                                Lihat Robot

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <!-- Input -->
            <div class="border-t border-zinc-800 p-4">

                <div class="flex gap-3">

                    <input type="text" placeholder="Tulis pesan untuk AIRA..."
                        class="flex-1
                               bg-zinc-950
                               border border-zinc-800
                               rounded-xl
                               px-4 py-3
                               outline-none
                               focus:border-indigo-400">

                    <button
                        class="bg-indigo-500
                               hover:bg-indigo-400
                               px-6
                               rounded-xl
                               font-semibold
                               transition">

                        Kirim

                    </button>

                </div>

            </div>

        </div>


        <!-- Robot Section -->
        <section class="mt-8">

            <div class="flex items-center justify-between mb-4">

                <div>
                    <h2 class="text-xl font-bold">
                        🤖 Robot AI
                    </h2>

                    <p class="text-zinc-500 text-sm">
                        Robot yang tersedia di AIRA HUB
                    </p>
                </div>

            </div>


            <div class="grid md:grid-cols-3 gap-4">


                <div
                    class="bg-zinc-900
                            border border-zinc-800
                            rounded-2xl
                            p-5">

                    <div class="text-3xl mb-3">
                        💻
                    </div>

                    <h3 class="font-semibold">
                        Coding Robot
                    </h3>

                    <p class="text-zinc-500 text-sm mt-2">
                        Membantu coding dan debugging.
                    </p>

                    <button class="mt-4 text-indigo-400 text-sm">
                        Lihat →
                    </button>

                </div>


                <div
                    class="bg-zinc-900
                            border border-zinc-800
                            rounded-2xl
                            p-5">

                    <div class="text-3xl mb-3">
                        📈
                    </div>

                    <h3 class="font-semibold">
                        Sales Robot
                    </h3>

                    <p class="text-zinc-500 text-sm mt-2">
                        Membantu proses penjualan.
                    </p>

                    <button class="mt-4 text-indigo-400 text-sm">
                        Lihat →
                    </button>

                </div>


                <div
                    class="bg-zinc-900
                            border border-zinc-800
                            rounded-2xl
                            p-5">

                    <div class="text-3xl mb-3">
                        ✍️
                    </div>

                    <h3 class="font-semibold">
                        Writing Robot
                    </h3>

                    <p class="text-zinc-500 text-sm mt-2">
                        Membantu membuat berbagai tulisan.
                    </p>

                    <button class="mt-4 text-indigo-400 text-sm">
                        Lihat →
                    </button>

                </div>


            </div>

        </section>

    </main>

</body>

</html>
