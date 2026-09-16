import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function MyOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOffers();
    }, []);

    async function loadOffers() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/my-offers", {
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Gagal mengambil penawaran."
                );
            }

            setOffers(data);
        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                    "Terjadi kesalahan saat mengambil data."
            );
        } finally {
            setLoading(false);
        }
    }

    function getStatusClass(status) {
        if (status === "accepted") {
            return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
        }

        if (status === "rejected") {
            return "border-red-500/30 bg-red-500/10 text-red-400";
        }

        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    }

    function getStatusLabel(status) {
        if (status === "accepted") {
            return "Accepted";
        }

        if (status === "rejected") {
            return "Rejected";
        }

        return "Pending";
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {/* Navbar */}
            <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <a
                        href="/dashboard"
                        className="text-2xl font-bold"
                    >
                        AIRA
                        <span className="text-indigo-400">
                            {" "}
                            HUB
                        </span>
                    </a>

                    <div className="flex items-center gap-3">

                        <a
                            href="/solutions"
                            className="px-4 py-2 text-zinc-300 hover:text-white transition"
                        >
                            Solutions
                        </a>

                        <a
                            href="/dashboard"
                            className="px-5 py-2.5 rounded-xl border border-zinc-700 hover:border-indigo-400 transition"
                        >
                            Dashboard
                        </a>

                    </div>

                </div>
            </nav>


            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <section className="mb-10">

                    <p className="text-indigo-400 font-medium mb-2">
                        AIRA SOLUTIONS
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        My Offers
                    </h1>

                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Lihat semua solusi yang pernah kamu
                        tawarkan kepada perusahaan.
                    </p>

                </section>


                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-900 bg-red-950/30 px-5 py-4 text-red-300">
                        {error}
                    </div>
                )}


                {/* Loading */}
                {loading && (
                    <div className="py-20 text-center text-zinc-500">
                        Memuat penawaran...
                    </div>
                )}


                {/* Empty */}
                {!loading && offers.length === 0 && (
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center">

                        <div className="text-5xl mb-5">
                            🛠️
                        </div>

                        <h2 className="text-2xl font-semibold mb-3">
                            Belum ada penawaran
                        </h2>

                        <p className="text-zinc-400 mb-7">
                            Kamu belum menawarkan solusi
                            kepada perusahaan mana pun.
                        </p>

                        <a
                            href="/solutions"
                            className="inline-flex px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                        >
                            Cari Kebutuhan Perusahaan →
                        </a>

                    </div>
                )}


                {/* Offers */}
                {!loading && offers.length > 0 && (

                    <div className="grid md:grid-cols-2 gap-6">

                        {offers.map((offer) => (

                            <div
                                key={offer.id}
                                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 hover:border-indigo-500/50 hover:-translate-y-1 transition"
                            >

                                {/* Top */}
                                <div className="flex items-start justify-between gap-4 mb-5">

                                    <div>

                                        <p className="text-xs text-indigo-400 mb-2">
                                            PENAWARAN SOLUSI
                                        </p>

                                        <h2 className="text-2xl font-semibold">
                                            {offer.title}
                                        </h2>

                                    </div>

                                    <span
                                        className={`shrink-0 px-3 py-1 rounded-full border text-xs ${getStatusClass(
                                            offer.status
                                        )}`}
                                    >
                                        {getStatusLabel(
                                            offer.status
                                        )}
                                    </span>

                                </div>


                                {/* Requirement */}
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mb-5">

                                    <p className="text-xs text-zinc-500 mb-2">
                                        Kebutuhan perusahaan
                                    </p>

                                    <h3 className="font-semibold text-lg mb-1">
                                        {offer.requirement?.title ||
                                            "Requirement"}
                                    </h3>

                                    <p className="text-sm text-zinc-500">
                                        {offer.requirement?.company ||
                                            "Perusahaan"}
                                    </p>

                                </div>


                                {/* Description */}
                                <p className="text-zinc-400 leading-7 mb-6">
                                    {offer.description}
                                </p>


                                {/* Info */}
                                <div className="grid grid-cols-2 gap-3 mb-6">

                                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                                        <p className="text-xs text-zinc-500 mb-1">
                                            Harga
                                        </p>

                                        <p className="font-semibold">
                                            {offer.price ||
                                                "Negosiasi"}
                                        </p>

                                    </div>

                                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                                        <p className="text-xs text-zinc-500 mb-1">
                                            Estimasi
                                        </p>

                                        <p className="font-semibold">
                                            {offer.delivery_time ||
                                                "-"}
                                        </p>

                                    </div>

                                </div>


                                {/* Category / Location */}
                                <div className="flex flex-wrap gap-2 mb-6">

                                    {offer.requirement?.category && (
                                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs">
                                            {offer.requirement.category}
                                        </span>
                                    )}

                                    {offer.requirement?.location && (
                                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs">
                                            📍{" "}
                                            {
                                                offer.requirement
                                                    .location
                                            }
                                        </span>
                                    )}

                                </div>


                                {/* Action */}
                                <div className="border-t border-zinc-800 pt-5">

                                    {offer.status === "pending" && (
                                        <div className="text-sm text-zinc-500">
                                            ⏳ Menunggu keputusan
                                            pemilik requirement.
                                        </div>
                                    )}

                                    {offer.status === "accepted" && (
                                        <div className="flex items-center justify-between gap-4">

                                            <div className="text-sm text-emerald-400">
                                                ✓ Penawaran diterima.
                                            </div>

                                            <button
                                                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                                                onClick={() => {
                                                    const companyUserId =
                                                        offer.requirement?.user_id;

                                                    if (!companyUserId) {
                                                        alert(
                                                            "Data pemilik requirement belum tersedia."
                                                        );
                                                        return;
                                                    }

                                                    window.location.href = `/messages?user=${companyUserId}`;
                                                }}
                                            >
                                                Mulai Chat →
                                            </button>

                                        </div>
                                    )}

                                    {offer.status === "rejected" && (
                                        <div className="text-sm text-red-400">
                                            ✕ Penawaran ditolak.
                                        </div>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>


            {/* Footer */}
            <footer className="border-t border-zinc-800 mt-16 py-6 text-center text-zinc-500 text-sm">
                © {new Date().getFullYear()} AIRA HUB.
                Build. Learn. Create. Grow.
            </footer>

        </div>
    );
}


const rootElement = document.getElementById(
    "my-offers-app"
);

if (rootElement) {
    createRoot(rootElement).render(<MyOffers />);
}
