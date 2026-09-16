<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>AIRA Customer Service - AIRA HUB</title>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-zinc-950 text-white min-h-screen">

    <!-- Navbar -->
    <nav class="border-b border-zinc-800">
        <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

            <a href="/dashboard" class="text-xl font-bold">
                AIRA<span class="text-indigo-400"> HUB</span>
            </a>

            <a href="/chat"
               class="text-zinc-400 hover:text-white transition">
                ← Kembali ke AI Chat
            </a>

        </div>
    </nav>


    <!-- Detail -->
    <main class="max-w-6xl mx-auto px-6 py-12">

        <div class="grid lg:grid-cols-2 gap-10 items-start">

            <!-- Robot Preview -->
            <div class="bg-zinc-900
                        border border-zinc-800
                        rounded-3xl
                        p-10
                        text-center">

                <div class="text-8xl mb-8">
                    🤖
                </div>

                <span class="inline-block
                             bg-indigo-500/10
                             border border-indigo-500/20
                             text-indigo-400
                             px-4 py-2
                             rounded-full
                             text-sm">

                    Customer Service

                </span>

            </div>


            <!-- Information -->
            <div>

                <p class="text-indigo-400 font-medium mb-3">
                    AIRA AI ROBOT
                </p>

                <h1 class="text-4xl font-bold">
                    AIRA Customer Service
                </h1>

                <p class="text-zinc-400 text-lg mt-5 leading-relaxed">
                    Robot AI yang dirancang untuk membantu bisnis
                    melayani pelanggan secara otomatis, cepat,
                    dan tersedia kapan saja.
                </p>


                <!-- Price -->
                <div class="mt-8">

                    <p class="text-zinc-500 text-sm">
                        Harga
                    </p>

                    <p class="text-3xl font-bold mt-1">
                        Rp199.000
                    </p>

                </div>


                <!-- Features -->
                <div class="mt-8">

                    <h2 class="font-semibold text-xl mb-4">
                        Fitur Robot
                    </h2>

                    <div class="space-y-3">

                        <div class="flex gap-3 text-zinc-300">
                            <span class="text-green-400">✓</span>
                            Menjawab pertanyaan pelanggan
                        </div>

                        <div class="flex gap-3 text-zinc-300">
                            <span class="text-green-400">✓</span>
                            Membantu customer 24/7
                        </div>

                        <div class="flex gap-3 text-zinc-300">
                            <span class="text-green-400">✓</span>
                            Respon otomatis
                        </div>

                        <div class="flex gap-3 text-zinc-300">
                            <span class="text-green-400">✓</span>
                            Bisa dikustomisasi
                        </div>

                    </div>

                </div>


                <!-- Buy -->
                <button
                    class="w-full
                           mt-10
                           bg-indigo-500
                           hover:bg-indigo-400
                           py-4
                           rounded-xl
                           font-semibold
                           text-lg
                           transition">

                    🤖 Beli Robot — Rp199.000

                </button>


                <p class="text-center text-zinc-600 text-sm mt-4">
                    Pembelian akan terhubung dengan akun AIRA HUB kamu.
                </p>

            </div>

        </div>

    </main>

</body>
</html>
