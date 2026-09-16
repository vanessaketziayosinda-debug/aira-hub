import { useState } from 'react';
import axios from 'axios';

const questions = [
    {
        level: 'Level 1: Kenal Industri',
        q: 'Q1. Prioritas saat client minta fitur mepet deadline?',
        options: [
            'A. Bilang gak bisa',
            'B. Kasih 2 opsi',
            'C. Lembur diam-diam',
        ],
        answer: 1,
    },
    {
        level: 'Level 2: Problem Solving',
        q: 'Q2. Kalau menemukan bug besar sebelum project diserahkan?',
        options: [
            'A. Sembunyikan bug',
            'B. Laporkan dan berikan solusi',
            'C. Salahkan developer lain',
        ],
        answer: 1,
    },
    {
        level: 'Level 2: Profesional',
        q: 'Q3. Client mengubah requirement berkali-kali?',
        options: [
            'A. Ikuti semua tanpa diskusi',
            'B. Diskusikan perubahan dan dampaknya',
            'C. Langsung berhenti mengerjakan',
        ],
        answer: 1,
    },
    {
        level: 'Level 3: BOSS LEVEL',
        q: 'Q4. Client 5jt minta kayak Tokopedia?',
        options: [
            'A. Terima',
            'B. Kasih 3 paket',
            'C. Tolak',
        ],
        answer: 1,
    },
    {
        level: 'Level 3: Leadership',
        q: 'Q5. Tim kamu terlambat menyelesaikan project. Apa yang kamu lakukan?',
        options: [
            'A. Marahi semua anggota tim',
            'B. Cari penyebab dan susun solusi',
            'C. Biarkan saja',
        ],
        answer: 1,
    },
];

export default function CareerQuest() {
    const [step, setStep] = useState('start');
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [finalScore, setFinalScore] = useState(0);
    const [loading, setLoading] = useState(false);

    const question = questions[current];

    const startGame = () => {
        setStep('game');
        setCurrent(0);
        setScore(0);
        setSelected(null);
        setFinalScore(0);
    };

    const submitAnswer = async () => {
        if (selected === null) {
            return;
        }

        const isCorrect = selected === question.answer;
        const newScore = score + (isCorrect ? 1 : 0);

        setScore(newScore);

        if (current < questions.length - 1) {
            setCurrent(current + 1);
            setSelected(null);
            return;
        }

        const calculatedScore = Math.round(
            (newScore / questions.length) * 100
        );

        setFinalScore(calculatedScore);
        setLoading(true);

        try {
            await axios.post('/api/career-quest/submit', {
                score: calculatedScore,
            });
        } catch (error) {
            console.error('Gagal mengirim hasil:', error);
        } finally {
            setLoading(false);
            setStep('result');
        }
    };

    if (step === 'start') {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
                <div className="max-w-2xl w-full text-center">

                    <div className="text-6xl mb-6">
                        🚀
                    </div>

                    <h1 className="text-5xl font-bold mb-4">
                        AIRA Career Quest
                    </h1>

                    <p className="text-zinc-400 text-lg mb-8">
                        Uji mindset, problem solving, dan kesiapanmu
                        menghadapi dunia industri.
                    </p>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <div className="text-3xl font-bold">
                                    {questions.length}
                                </div>
                                <div className="text-zinc-500 text-sm">
                                    Pertanyaan
                                </div>
                            </div>

                            <div>
                                <div className="text-3xl font-bold">
                                    🧠
                                </div>
                                <div className="text-zinc-500 text-sm">
                                    Mindset
                                </div>
                            </div>

                            <div>
                                <div className="text-3xl font-bold">
                                    🏆
                                </div>
                                <div className="text-zinc-500 text-sm">
                                    Career Score
                                </div>
                            </div>

                        </div>
                    </div>

                    <button
                        onClick={startGame}
                        className="bg-indigo-500 hover:bg-indigo-400 px-8 py-4 rounded-xl font-bold text-lg transition"
                    >
                        Mulai Career Quest 🚀
                    </button>

                </div>
            </div>
        );
    }

    if (step === 'result') {
        let recommendation = 'Terus tingkatkan kemampuanmu!';

        if (finalScore >= 80) {
            recommendation = '🔥 Mindset Industri! Direkomendasikan untuk posisi Lead.';
        } else if (finalScore >= 60) {
            recommendation = '👍 Kamu cukup siap untuk masuk dunia industri.';
        } else {
            recommendation = '💪 Perbanyak pengalaman dan latihan problem solving.';
        }

        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
                <div className="max-w-2xl w-full">

                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-10 rounded-3xl text-center shadow-2xl">

                        <div className="text-6xl mb-5">
                            🎉
                        </div>

                        <h1 className="text-4xl font-bold mb-6">
                            SELESAI!
                        </h1>

                        <div className="text-7xl font-black text-yellow-300 mb-6">
                            {finalScore}
                        </div>

                        <p className="text-xl font-semibold mb-3">
                            Career Score
                        </p>

                        <p className="text-lg mb-4">
                            {recommendation}
                        </p>

                        <p className="text-indigo-100 mb-8">
                            Hasil Career Quest sudah dikirim ke
                            Dashboard HRD AIRA HUB.
                        </p>

                       <div className="flex flex-col sm:flex-row gap-3 justify-center">

    <button
        onClick={startGame}
        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-zinc-100 transition"
    >
        🔄 Coba Lagi
    </button>

    <button
        onClick={() => {
            window.location.href = '/';
        }}
        className="bg-zinc-950/40 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-950/60 transition"
    >
        ← Kembali ke AIRA HUB
    </button>

</div>
                    </div>

                    {loading && (
                        <p className="text-center text-zinc-500 mt-4">
                            Mengirim hasil...
                        </p>
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

            <div className="max-w-3xl w-full">

                {/* Progress */}
                <div className="flex justify-between text-sm text-zinc-500 mb-3">
                    <span>
                        {question.level}
                    </span>

                    <span>
                        {current + 1} / {questions.length}
                    </span>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-2 mb-8">
                    <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{
                            width: `${((current + 1) / questions.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Question */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                    <h1 className="text-2xl md:text-3xl font-bold mb-8">
                        {question.q}
                    </h1>

                    <div className="space-y-4">

                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                className={`w-full text-left p-5 rounded-xl border transition ${
                                    selected === index
                                        ? 'border-indigo-500 bg-indigo-500/10'
                                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
                                }`}
                            >
                                {option}
                            </button>
                        ))}

                    </div>

                    <button
                        onClick={submitAnswer}
                        disabled={selected === null}
                        className="w-full mt-8 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed py-4 rounded-xl font-bold transition"
                    >
                        {current === questions.length - 1
                            ? 'Selesai & Lihat Score 🏆'
                            : 'Jawab & Lanjut →'}
                    </button>

                </div>

            </div>

        </div>
    );
}
