<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Robot AI - AIRA HUB</title>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800 bg-zinc-950/90">
        <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/dashboard" class="text-xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <div class="flex items-center gap-4">
                <a href="/chat"
                   class="text-zinc-400 hover:text-white transition">
                    💬 AI Chat
                </a>

                <a href="/dashboard"
                   class="text-zinc-400 hover:text-white transition">
                    ← Dashboard
                </a>
            </div>

        </div>
    </nav>


    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-6 py-16">

        <div class="max-w-3xl">

            <div class="inline-flex items-center gap-2
                        bg-indigo-500/10
                        border border-indigo-500/20
                        text-indigo-300
                        px-4 py-2
                        rounded-full
                        text-sm
                        mb-6">

                🤖 AIRA AI ROBOT STORE

            </div>

            <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
                Temukan Robot AI
                <span class="text-indigo-400"> untuk kebutuhanmu.</span>
            </h1>

            <p class="text-zinc-400 text-lg mt-6">
                Gunakan robot AI siap pakai untuk membantu pekerjaan,
                bisnis, coding, marketing, dan berbagai kebutuhan lainnya.
            </p>

        </div>


        <!-- Search -->
        <div class="mt-10 flex flex-col md:flex-row gap-4">

            <input
                type="text"
                placeholder="Cari robot AI..."
                class="flex-1 bg-zinc-900
                       border border-zinc-800
                       rounded-xl
                       px-5 py-4
                       outline-none
                       focus:border-indigo-400"
            >

            <select
                class="bg-zinc-900
                       border border-zinc-800
                       rounded-xl
                       px-5 py-4
                       outline-none
                       text-zinc-300">

                <option>Semua Kategori</option>
                <option>Business</option>
                <option>Programming</option>
                <option>Marketing</option>
                <option>Writing</option>
                <option>Customer Service</option>

            </select>

            <button
                class="bg-indigo-500
                       hover:bg-indigo-400
                       px-7 py-4
                       rounded-xl
                       font-semibold
                       transition">

                Cari

            </button>

        </div>

    </section>


    <!-- Robot List -->
    <section class="max-w-7xl mx-auto px-6 pb-20">

        <div class="flex items-center justify-between mb-8">

            <div>
                <h2 class="text-2xl font-bold">
                    Robot AI Pilihan
                </h2>

                <p class="text-zinc-500 mt-1">
                    Pilih robot sesuai kebutuhanmu.
                </p>
            </div>

        </div>


      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    @forelse ($robots as $robot)

        <div class="bg-zinc-900
                    border border-zinc-800
                    rounded-3xl
                    p-6
                    hover:border-indigo-500/50
                    transition">

            <div class="text-5xl mb-6">
                🤖
            </div>

            <div class="flex items-center justify-between gap-3">

                <h3 class="text-xl font-semibold">
                    {{ $robot->name }}
                </h3>

                <span class="text-xs
                             bg-indigo-500/10
                             text-indigo-400
                             px-3 py-1
                             rounded-full">
                    {{ $robot->category }}
                </span>

            </div>

            <p class="text-zinc-400 mt-3">
                {{ $robot->description }}
            </p>

            <div class="flex items-center justify-between mt-6">

                <span class="text-indigo-400 font-bold">
                    Rp{{ number_format($robot->price, 0, ',', '.') }}
                </span>

                <a
                    href="#"
                    class="bg-zinc-800
                           hover:bg-indigo-500
                           px-4 py-2
                           rounded-lg
                           transition">

                    Lihat Robot

                </a>

            </div>

        </div>

    @empty

        <div class="col-span-full
                    bg-zinc-900
                    border border-zinc-800
                    rounded-3xl
                    p-10
                    text-center">

            <div class="text-5xl mb-4">
                🤖
            </div>

            <h3 class="text-xl font-semibold">
                Belum ada Robot AI
            </h3>

            <p class="text-zinc-500 mt-2">
                Robot yang tersedia akan muncul di sini.
            </p>

        </div>

    @endforelse

</div>