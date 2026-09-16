<!DOCTYPE html>

<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>AIRA HUB — AI, Jobs & Projects</title>

    @vite([

        'resources/css/app.css',

        'resources/js/robot.jsx'

    ])

    <style>

        html {

            scroll-behavior: smooth;

        }

        body {

            overflow-x: hidden;

        }

        /\* =========================================================

           ROBOT GUIDE CARD

        ========================================================== \*/

        .aira-feature-card {

            position: relative;

            transform: translateY(0) scale(1);

            transition:

                transform 0.6s ease,

                box-shadow 0.6s ease,

                border-color 0.6s ease,

                *background* 0.6s ease;

        }

        .aira-feature-card.aira-active {

            transform:

                translateY(-12px)

                scale(1.025);

            border-color:

                rgba(99, 102, 241, 0.9);

            box-shadow:

                0 0 0 1px rgba(99, 102, 241, 0.15),

                0 0 35px rgba(79, 70, 229, 0.25),

                0 25px 60px rgba(0, 0, 0, 0.4);

        }

        .aira-feature-card.aira-active::before {

            content: "";

            position: absolute;

            inset: -1px;

            border-radius: 1.5rem;

            pointer-events: none;

            background:

                linear-gradient(

                    120deg,

                    transparent,

                    rgba(99, 102, 241, 0.12),

                    transparent

                );

            animation:

                aira-scan 2s linear infinite;

        }

        @keyframes aira-scan {

            0% {

                transform: translateX(-100%);

            }

            100% {

                transform: translateX(100%);

            }

        }

        /\* =========================================================

           HERO GLOW

        ========================================================== \*/

        .aira-glow {

            position: absolute;

            width: 420px;

            height: 420px;

            border-radius: 9999px;

            background:

                radial-gradient(

                    circle,

                    rgba(79, 70, 229, 0.18),

                    transparent 70%

                );

            filter: blur(20px);

            pointer-events: none;

        }

        /\* =========================================================

           ROBOT CONTAINER

        ========================================================== \*/

        #aira-robot {

            position: relative;

            background:

                radial-gradient(

                    circle at center,

                    rgba(30, 64, 175, 0.08),

                    transparent 55%

                );

        }

        /\* =========================================================

           PRINT

        ========================================================== \*/

        @media print {

            nav,

            footer,

            #aira-robot {

                display: none !important;

            }

            body {

                background: white !important;

                color: black !important;

            }

        }

        /\* =========================================================

           MOBILE

        ========================================================== \*/

        @media (max-width: 640px) {

            #aira-robot {

                height: 500px !important;

            }

        }

    </style>

</head>



<body class="bg-zinc-950 text-white min-h-screen">



    <!-- =========================================================

         NAVBAR

    ========================================================== -->

    <nav

        class="border-b border-zinc-800 sticky top-0 z-50

        bg-zinc-950/90 backdrop-blur-xl"

    >

        <div

            class="max-w-7xl mx-auto px-6 py-5

            flex items-center justify-between"

        >

            <!-- LOGO -->

            <a

                href="/"

                class="flex items-center"

            >

                <img

                    src="/images/logo-aira.png"

                    alt="AIRA HUB"

                    class="h-12 w-auto object-contain"

                >

            </a>



            <!-- NAVIGATION -->

            <div class="flex items-center gap-3">

                <a

                    href="/docs"

                    class="px-4 py-2.5 rounded-xl

                    text-zinc-300

                    hover\:text-white

                    hover\:bg-zinc-900

                    transition"

                >

                    Documentation

                </a>



                <a href="/solutions" class="px-4 py-2.5 rounded-xl text-zinc-300 hover\:text-white hover\:bg-zinc-900 transition">
                    Solutions
                </a>

                <a

                    href="/login"

                    class="px-5 py-2.5 rounded-xl

                    border border-zinc-700

                    hover\:bg-zinc-900

                    transition"

                >

                    Login

                </a>



                <a

                    href="/register"

                    class="px-5 py-2.5 rounded-xl

                    bg-indigo-500

                    hover\:bg-indigo-400

                    transition

                    font-semibold"

                >

                    Daftar

                </a>

            </div>

        </div>

    </nav>



    <!-- =========================================================

         MAIN

    ========================================================== -->

    <main>



        <!-- =====================================================

             HERO

        ====================================================== -->

        <section

            class="relative max-w-7xl mx-auto

            px-6 pt-24 pb-16

            text-center overflow-hidden"

        >

            <div

                class="aira-glow"

                style="

                    left: 50%;

                    top: 40px;

                    transform: translateX(-50%);

                "

            ></div>



            <!-- Badge -->

            <div

                class="relative inline-flex items-center gap-2

                px-4 py-2 rounded-full

                bg-zinc-900

                border border-zinc-800

                text-sm text-zinc-300

                mb-8"

            >

                🤖 AIRA HUB

                <span class="text-zinc-500">

                    •

                </span>

                AI + Jobs + Projects

            </div>



            <!-- Heading -->

            <h1

                class="relative text-5xl md\:text-7xl

                font-bold tracking-tight

                leading-tight"

            >

                One place to

                <span class="text-indigo-400">

                    build, learn,

                </span>

                <br>

                create and grow.

            </h1>



            <!-- Description -->

            <p

                class="relative max-w-2xl mx-auto

                mt-7 text-lg text-zinc-400

                leading-relaxed"

            >

                Gunakan AI, temukan pekerjaan,

                bangun project, kembangkan skill,

                dan ubah kemampuanmu menjadi peluang.

            </p>



            <!-- CTA -->

            <div

                class="relative flex flex-col

                sm\:flex-row justify-center

                gap-4 mt-10"

            >

                <a

                    href="/register"

                    class="px-7 py-3.5 rounded-xl

                    bg-indigo-500

                    hover\:bg-indigo-400

                    font-semibold

                    transition

                    hover:-translate-y-0.5"

                >

                    🚀 Mulai Sekarang

                </a>



                <a

                    href="/login"

                    class="px-7 py-3.5 rounded-xl

                    bg-zinc-900

                    border border-zinc-800

                    hover\:bg-zinc-800

                    transition

                    hover:-translate-y-0.5"

                >

                    Login ke AIRA HUB

                </a>

            </div>

        </section>



        <!-- =====================================================
             DISCOVER AIRA HUB
        ====================================================== -->
        <section class="max-w-7xl mx-auto px-6 pb-24">
            <div class="max-w-3xl mx-auto text-center mb-10">
                <span class="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Explore AIRA HUB</span>
                <h2 class="text-3xl md:text-4xl font-bold mt-4">Apa yang ingin kamu lakukan?</h2>
                <p class="text-zinc-400 mt-4 leading-relaxed">Pilih kebutuhanmu dan temukan bagian AIRA HUB yang paling sesuai.</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <a href="/robots" class="group rounded-3xl bg-zinc-900 border border-zinc-800 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50"><div class="text-3xl mb-5">🤖</div><h3 class="text-xl font-semibold">AIRA AI</h3><p class="text-zinc-400 mt-3">Gunakan AI untuk berbagai kebutuhan digital.</p><span class="inline-block mt-6 text-indigo-400">Jelajahi AI →</span></a>
                <a href="/jobs" class="group rounded-3xl bg-zinc-900 border border-zinc-800 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50"><div class="text-3xl mb-5">💼</div><h3 class="text-xl font-semibold">AIRA JOBS</h3><p class="text-zinc-400 mt-3">Cari peluang pekerjaan atau temukan talent.</p><span class="inline-block mt-6 text-indigo-400">Cari pekerjaan →</span></a>
                <a href="/projects" class="group rounded-3xl bg-zinc-900 border border-zinc-800 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50"><div class="text-3xl mb-5">🎨</div><h3 class="text-xl font-semibold">AIRA KARYA</h3><p class="text-zinc-400 mt-3">Tampilkan karya dan project kepada yang membutuhkan.</p><span class="inline-block mt-6 text-indigo-400">Lihat karya →</span></a>
                <a href="/solutions" class="group rounded-3xl bg-zinc-900 border border-indigo-500/30 p-6 transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/5"><div class="flex items-center justify-between"><div class="text-3xl">🏢</div><span class="px-2.5 py-1 rounded-full bg-indigo-500/10 text-[10px] uppercase tracking-widest text-indigo-300">New</span></div><h3 class="text-xl font-semibold mt-5">AIRA SOLUTIONS</h3><p class="text-zinc-400 mt-3">Perusahaan mencari solusi teknologi; provider menawarkan solusi.</p><span class="inline-block mt-6 text-indigo-400">Cari Solusi →</span></a>
                <a href="/career-quest" class="group rounded-3xl bg-zinc-900 border border-zinc-800 p-6 transition hover:-translate-y-1 hover:border-purple-500/50"><div class="text-3xl mb-5">🎮</div><h3 class="text-xl font-semibold">AIRA Career Quest</h3><p class="text-zinc-400 mt-3">Uji mindset dan problem solving melalui game.</p><span class="inline-block mt-6 text-purple-400">Mulai Quest →</span></a>
                <a href="/robots" class="group rounded-3xl bg-zinc-900 border border-zinc-800 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50"><div class="text-3xl mb-5">🦾</div><h3 class="text-xl font-semibold">Robot Store</h3><p class="text-zinc-400 mt-3">Jelajahi robot dan teknologi automation.</p><span class="inline-block mt-6 text-indigo-400">Jelajahi Robot →</span></a>
            </div>
        </section>

        <!-- =====================================================

             3D ROBOT GUIDE

        ====================================================== -->

        <section

            class="max-w-7xl mx-auto

            px-6 pb-24"

        >

            <div

                id="aira-robot"

                class="w-full h-[600px]

                rounded-3xl

                overflow-hidden

                border border-indigo-500/20

                bg-zinc-950"

            ></div>

        </section>



        <!-- =====================================================

             FEATURES

        ====================================================== -->

        <section

            class="max-w-7xl mx-auto

            px-6 pb-24"

        >

            <div

                class="grid md\:grid-cols-2

                lg\:grid-cols-4 gap-6"

            >



                <!-- =================================================

                     AIRA AI

                ================================================== -->

                <div

                    id="feature-ai"

                    class="aira-feature-card

                    bg-zinc-900

                    border border-zinc-800

                    rounded-3xl p-7

                    hover\:border-indigo-500

                    hover:-translate-y-1"

                >

                    <div class="text-4xl mb-5">

                        🤖

                    </div>



                    <h2 class="text-2xl font-semibold">

                        AIRA AI

                    </h2>



                    <p

                        class="text-zinc-400 mt-3

                        leading-relaxed"

                    >

                        Gunakan AI untuk chat,

                        writing, coding, image

                        dan berbagai kebutuhan lainnya.

                    </p>



                    <a

                        href="/robots"

                        class="inline-block mt-6

                        text-indigo-400

                        hover\:text-indigo-300"

                    >

                        Jelajahi AI →

                    </a>

                </div>



                <!-- =================================================

                     AIRA JOBS

                ================================================== -->

                <div

                    id="feature-jobs"

                    class="aira-feature-card

                    bg-zinc-900

                    border border-zinc-800

                    rounded-3xl p-7

                    hover\:border-indigo-500

                    hover:-translate-y-1"

                >

                    <div class="text-4xl mb-5">

                        💼

                    </div>



                    <h2 class="text-2xl font-semibold">

                        AIRA JOBS

                    </h2>



                    <p

                        class="text-zinc-400 mt-3

                        leading-relaxed"

                    >

                        Temukan pekerjaan sesuai

                        skill kamu atau tawarkan

                        pekerjaan kepada orang lain.

                    </p>



                    <a

                        href="/jobs"

                        class="inline-block mt-6

                        text-indigo-400

                        hover\:text-indigo-300"

                    >

                        Cari pekerjaan →

                    </a>

                </div>



                <!-- =================================================

                     CAREER QUEST

                ================================================== -->

                <div

                    id="feature-career"

                    class="aira-feature-card

                    bg-zinc-900

                    border border-zinc-800

                    rounded-3xl p-7

                    hover\:border-purple-500

                    hover:-translate-y-1"

                >

                    <div class="text-4xl mb-5">

                        🎮

                    </div>



                    <h2 class="text-2xl font-semibold">

                        AIRA Career Quest

                    </h2>



                    <p

                        class="text-zinc-400 mt-3

                        leading-relaxed"

                    >

                        Uji mindset, problem solving,

                        dan kesiapanmu menghadapi

                        dunia industri melalui game.

                    </p>



                    <a

                        href="/career-quest"

                        class="inline-block mt-6

                        text-purple-400

                        hover\:text-purple-300"

                    >

                        Mulai Career Quest →

                    </a>

                </div>



                <!-- =================================================

                     PROJECTS

                ================================================== -->

                <div

                    id="feature-projects"

                    class="aira-feature-card

                    bg-zinc-900

                    border border-zinc-800

                    rounded-3xl p-7

                    hover\:border-indigo-500

                    hover:-translate-y-1"

                >

                    <div class="text-4xl mb-5">

                        📁

                    </div>



                    <h2 class="text-2xl font-semibold">

                        Projects

                    </h2>



                    <p

                        class="text-zinc-400 mt-3

                        leading-relaxed"

                    >

                        Bangun, simpan, dan

                        kembangkan project

                        yang kamu kerjakan.

                    </p>



                    <a

                        href="/projects"

                        class="inline-block mt-6

                        text-indigo-400

                        hover\:text-indigo-300"

                    >

                        Lihat Projects →

                    </a>

                </div>

            </div>

        </section>



        <!-- =====================================================

             ADVERTISEMENT

        ====================================================== -->

        <section

            class="max-w-7xl mx-auto

            px-6 pb-24"

        >

            <div

                class="relative overflow-hidden

                rounded-3xl

                border border-indigo-500/20

                bg-gradient-to-br

                from-indigo-500/10

                via-zinc-900

                to-purple-500/10

                p-7 md\:p-9"

            >

                <div

                    class="flex flex-col

                    md\:flex-row

                    md\:items-center

                    md\:justify-between

                    gap-7"

                >

                    <div>

                        <div

                            class="flex items-center

                            gap-2 mb-4"

                        >

                            <span

                                class="px-2.5 py-1

                                rounded-md

                                bg-zinc-950/70

                                border border-zinc-800

                                text-[10px]

                                uppercase

                                tracking-widest

                                text-zinc-500"

                            >

                                Advertisement

                            </span>



                            <span

                                class="text-xs text-zinc-600"

                            >

                                Sponsored

                            </span>

                        </div>



                        <h2

                            class="text-2xl md\:text-3xl

                            font-bold"

                        >

                            Promote your business

                            on AIRA HUB

                        </h2>



                        <p

                            class="text-zinc-400 mt-3

                            max-w-2xl

                            leading-relaxed"

                        >

                            Reach creators, developers,

                            freelancers, and digital

                            professionals through the

                            AIRA HUB ecosystem.

                        </p>

                    </div>



                    <a

                        href="/advertise"

                        class="shrink-0

                        inline-flex

                        items-center

                        justify-center

                        px-6 py-3

                        rounded-xl

                        bg-indigo-500

                        hover\:bg-indigo-400

                        transition

                        font-semibold"

                    >

                        Advertise with AIRA HUB →

                    </a>

                </div>

            </div>

        </section>



        <!-- =====================================================

             ABOUT AIRA HUB

        ====================================================== -->

        <section

            class="border-y

            border-zinc-800

            bg-zinc-900/40"

        >

            <div

                class="max-w-4xl mx-auto

                px-6 py-24

                text-center"

            >

                <div

                    class="inline-flex items-center

                    px-4 py-2 rounded-full

                    bg-indigo-500/10

                    border border-indigo-500/20

                    text-indigo-300

                    text-sm mb-7"

                >

                    OUR STORY

                </div>



                <h2

                    class="text-4xl md\:text-5xl

                    font-bold tracking-tight"

                >

                    Dibangun Dari Keresahan.

                </h2>



                <p

                    class="text-lg text-zinc-400

                    mt-7 leading-relaxed"

                >

                    AIRA HUB dibangun dari sebuah pertanyaan:

                    <span class="text-white font-semibold">

                        bagaimana teknologi bisa membantu

                        manusia menemukan peluang,

                        mengembangkan kemampuan,

                        dan menciptakan sesuatu yang bernilai?

                    </span>

                </p>



                <p

                    class="text-lg text-zinc-400

                    mt-5 leading-relaxed"

                >

                    Dari sana, AIRA HUB dikembangkan

                    sebagai sebuah ekosistem yang

                    menghubungkan

                    <span class="text-indigo-400">

                        people, skills, technology,

                        and opportunities.

                    </span>

                </p>



                <!-- STORY CARDS -->

                <div

                    class="grid md\:grid-cols-2 lg\:grid-cols-4

                    gap-5 mt-12 text-left"

                >

                    <!-- LEARN -->

                    <div

                        class="p-6 rounded-2xl

                        bg-zinc-950

                        border border-zinc-800"

                    >

                        <div class="text-3xl mb-4">

                            🧠

                        </div>



                        <h3

                            class="font-semibold

                            text-lg"

                        >

                            Learn

                        </h3>



                        <p

                            class="text-zinc-500

                            mt-2 text-sm

                            leading-relaxed"

                        >

                            Mengembangkan pengetahuan

                            dan kemampuan untuk menghadapi

                            dunia yang terus berubah.

                        </p>

                    </div>



                    <!-- CREATE -->

                    <div

                        class="p-6 rounded-2xl

                        bg-zinc-950

                        border border-zinc-800"

                    >

                        <div class="text-3xl mb-4">

                            🛠️

                        </div>



                        <h3

                            class="font-semibold

                            text-lg"

                        >

                            Create

                        </h3>



                        <p

                            class="text-zinc-500

                            mt-2 text-sm

                            leading-relaxed"

                        >

                            Mengubah kemampuan dan ide

                            menjadi karya, project,

                            dan solusi.

                        </p>

                    </div>



                    <!-- GROW -->

                    <div

                        class="p-6 rounded-2xl

                        bg-zinc-950

                        border border-zinc-800"

                    >

                        <div class="text-3xl mb-4">

                            🚀

                        </div>



                        <h3

                            class="font-semibold

                            text-lg"

                        >

                            Grow

                        </h3>



                        <p

                            class="text-zinc-500

                            mt-2 text-sm

                            leading-relaxed"

                        >

                            Menghubungkan kemampuan

                            dengan peluang untuk

                            terus berkembang.

                        </p>

                    </div>

                </div>



                <a

                    href="/tentang-kami"

                    class="inline-flex

                    items-center

                    mt-12

                    px-7 py-3.5

                    rounded-xl

                    border border-zinc-700

                    hover\:bg-zinc-800

                    transition

                    font-semibold"

                >

                    Baca Kisah AIRA HUB →

                </a>

            </div>

        </section>



        <!-- =====================================================

             ECOSYSTEM

        ====================================================== -->

        <section

            class="max-w-7xl mx-auto

            px-6 py-24"

        >

            <div class="max-w-3xl">

                <span

                    class="text-indigo-400

                    text-sm

                    font-semibold

                    uppercase

                    tracking-widest"

                >

                    The Ecosystem

                </span>



                <h2

                    class="text-4xl md\:text-5xl

                    font-bold mt-4"

                >

                    Bukan hanya satu fitur.

                    Sebuah ekosistem.

                </h2>



                <p

                    class="text-zinc-400

                    text-lg mt-5

                    leading-relaxed"

                >

                    AIRA HUB dirancang untuk

                    menghubungkan berbagai kebutuhan

                    dalam satu tempat. Mulai dari AI,

                    pekerjaan, project, pengembangan

                    skill, hingga teknologi.

                </p>

            </div>



            <!-- ECOSYSTEM CARDS -->

            <div

                class="grid md\:grid-cols-3

                gap-6 mt-12"

            >

                <!-- PEOPLE -->

                <div

                    class="rounded-3xl

                    border border-zinc-800

                    bg-zinc-900

                    p-7

                    hover\:border-indigo-500/50

                    transition"

                >

                    <div class="text-3xl">

                        💼

                    </div>



                    <h3

                        class="text-xl

                        font-semibold mt-5"

                    >

                        People & Jobs

                    </h3>



                    <p

                        class="text-zinc-400

                        mt-3

                        leading-relaxed"

                    >

                        Menghubungkan orang yang

                        memiliki kemampuan dengan

                        peluang pekerjaan.

                    </p>

                </div>



                <!-- SKILLS -->

                <div

                    class="rounded-3xl

                    border border-zinc-800

                    bg-zinc-900

                    p-7

                    hover\:border-indigo-500/50

                    transition"

                >

                    <div class="text-3xl">

                        🎨

                    </div>



                    <h3

                        class="text-xl

                        font-semibold mt-5"

                    >

                        Skills & Projects

                    </h3>



                    <p

                        class="text-zinc-400

                        mt-3

                        leading-relaxed"

                    >

                        Memberikan ruang untuk

                        membangun, menampilkan,

                        dan mengembangkan karya.

                    </p>

                </div>



                <!-- SOLUTIONS -->
                <a href="/solutions" class="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 hover:border-indigo-500/50 transition">
                    <div class="text-3xl">🏢</div>
                    <h3 class="text-xl font-semibold mt-5">Solutions</h3>
                    <p class="text-zinc-400 mt-3 leading-relaxed">Mempertemukan kebutuhan perusahaan dengan penyedia solusi teknologi.</p>
                </a>

                <!-- AI -->

                <div

                    class="rounded-3xl

                    border border-zinc-800

                    bg-zinc-900

                    p-7

                    hover\:border-indigo-500/50

                    transition"

                >

                    <div class="text-3xl">

                        🤖

                    </div>



                    <h3

                        class="text-xl

                        font-semibold mt-5"

                    >

                        AI & Technology

                    </h3>



                    <p

                        class="text-zinc-400

                        mt-3

                        leading-relaxed"

                    >

                        Menghadirkan teknologi AI

                        dan solusi digital dalam

                        satu ekosistem.

                    </p>

                </div>

            </div>

        </section>

    </main>



    <!-- =========================================================

         FOOTER

    ========================================================== -->

    <footer

        class="border-t

        border-zinc-800"

    >

        <div

            class="max-w-7xl mx-auto

            px-6 py-12"

        >

            <div

                class="flex flex-col

                md\:flex-row

                md\:items-center

                md\:justify-between

                gap-8"

            >

                <!-- FOOTER BRAND -->

                <div>

                    <img

                        src="/images/logo-aira.png"

                        alt="AIRA HUB"

                        class="h-10 w-auto mb-4"

                    >



                    <p

                        class="text-zinc-500

                        max-w-md"

                    >

                        Connecting people, skills,

                        technology and opportunities.

                    </p>

                </div>



                <!-- FOOTER LINKS -->

                <div

                    class="flex flex-wrap

                    gap-5 text-sm"

                >

                    <a

                        href="/tentang-kami"

                        class="text-zinc-400

                        hover\:text-white

                        transition"

                    >

                        About

                    </a>



                    <a

                        href="/docs"

                        class="text-zinc-400

                        hover\:text-white

                        transition"

                    >

                        Documentation

                    </a>



                    <a

                        href="/jobs"

                        class="text-zinc-400

                        hover\:text-white

                        transition"

                    >

                        Jobs

                    </a>



                    <a

                        href="/projects"

                        class="text-zinc-400

                        hover\:text-white

                        transition"

                    >

                        Projects

                    </a>

                <a href="/solutions" class="text-zinc-400 hover\:text-white transition">Solutions</a>



                    <a

                        href="/advertise"

                        class="text-zinc-400

                        hover\:text-white

                        transition"

                    >

                        Advertise

                    </a>

                </div>

            </div>



            <!-- COPYRIGHT -->

            <div

                class="border-t

                border-zinc-800

                mt-10 pt-6

                flex flex-col

                md\:flex-row

                md\:items-center

                md\:justify-between

                gap-3"

            >

                <p

                    class="text-zinc-600

                    text-sm"

                >

                    © {{ date('Y') }}

                    AIRA HUB.

                    All rights reserved.

                </p>



                <p

                    class="text-zinc-700

                    text-xs"

                >

                    Built for a smarter tomorrow.

                </p>

            </div>

        </div>

    </footer>



</body>

</html>
