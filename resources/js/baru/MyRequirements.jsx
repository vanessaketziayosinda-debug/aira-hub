import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function MyRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(null);
    const [offers, setOffers] = useState([]);
    const [loadingOffers, setLoadingOffers] = useState(false);

    const loadRequirements = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/my-requirements", {
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal mengambil requirement."
                );
            }

            setRequirements(data);
        } catch (err) {
            setError(err.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    const openRequirement = async (requirement) => {
        setSelected(requirement);
        setOffers([]);
        setLoadingOffers(true);

        try {
            const response = await fetch(
                `/api/requirements/${requirement.id}/offers`,
                {
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal mengambil penawaran."
                );
            }

            setOffers(data);
        } catch (err) {
            setError(err.message || "Gagal mengambil penawaran.");
        } finally {
            setLoadingOffers(false);
        }
    };

    const closeDetail = () => {
        setSelected(null);
        setOffers([]);
    };

    const acceptOffer = async (offerId) => {
        if (!selected) return;

        const confirmed = window.confirm(
            "Yakin ingin menerima penawaran ini?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `/api/requirements/${selected.id}/offers/${offerId}/accept`,
                {
                    method: "PATCH",
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getCsrfToken(),
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal menerima penawaran."
                );
            }

            setOffers((current) =>
                current.map((offer) =>
                    offer.id === offerId
                        ? {
                              ...offer,
                              status: "accepted",
                          }
                        : offer
                )
            );

            alert("Penawaran berhasil diterima.");
        } catch (err) {
            alert(err.message || "Terjadi kesalahan.");
        }
    };

    const rejectOffer = async (offerId) => {
        if (!selected) return;

        const confirmed = window.confirm(
            "Yakin ingin menolak penawaran ini?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `/api/requirements/${selected.id}/offers/${offerId}/reject`,
                {
                    method: "PATCH",
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getCsrfToken(),
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal menolak penawaran."
                );
            }

            setOffers((current) =>
                current.map((offer) =>
                    offer.id === offerId
                        ? {
                              ...offer,
                              status: "rejected",
                          }
                        : offer
                )
            );

            alert("Penawaran berhasil ditolak.");
        } catch (err) {
            alert(err.message || "Terjadi kesalahan.");
        }
    };

    useEffect(() => {
        loadRequirements();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Navbar */}
            <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a
                        href="/solutions"
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
                <div className="mb-10">
                    <p className="text-indigo-400 font-medium mb-2">
                        AIRA SOLUTIONS
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        My Requirements
                    </h1>

                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Kelola kebutuhan perusahaan yang pernah kamu
                        posting dan lihat penawaran solusi yang masuk.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-900 bg-red-950/30 px-5 py-4 text-red-300">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="py-20 text-center text-zinc-500">
                        Memuat requirement...
                    </div>
                )}

                {/* Empty */}
                {!loading && requirements.length === 0 && (
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center">
                        <div className="text-5xl mb-5">
                            🏢
                        </div>

                        <h2 className="text-2xl font-semibold mb-3">
                            Belum ada requirement
                        </h2>

                        <p className="text-zinc-400 mb-7">
                            Kamu belum membuat kebutuhan perusahaan.
                        </p>

                        <a
                            href="/solutions"
                            className="inline-flex px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                        >
                            Post Requirement →
                        </a>
                    </div>
                )}

                {/* Requirement Grid */}
                {!loading && requirements.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {requirements.map((requirement) => (
                            <div
                                key={requirement.id}
                                className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-7 hover:border-indigo-500/60 hover:-translate-y-1 transition"
                            >
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <div>
                                        <span className="inline-flex px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs">
                                            {requirement.category}
                                        </span>
                                    </div>

                                    <span className="text-xs text-zinc-500">
                                        {requirement.location ||
                                            "Indonesia"}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-semibold mb-2">
                                    {requirement.title}
                                </h2>

                                <p className="text-zinc-400 mb-2">
                                    {requirement.company}
                                </p>

                                <p className="text-zinc-500 line-clamp-3 mb-6">
                                    {requirement.description}
                                </p>

                                <div className="border-t border-zinc-800 pt-5 flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-zinc-500 mb-1">
                                            Budget
                                        </p>

                                        <p className="font-semibold">
                                            {requirement.budget ||
                                                "Negosiasi"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            openRequirement(
                                                requirement
                                            )
                                        }
                                        className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-indigo-500 font-semibold transition"
                                    >
                                        Lihat Detail →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Detail Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeDetail}
                >
                    <div
                        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* Modal Header */}
                        <div className="p-7 border-b border-zinc-800 flex items-start justify-between gap-5">
                            <div>
                                <p className="text-indigo-400 text-sm mb-2">
                                    {selected.category}
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {selected.title}
                                </h2>

                                <p className="text-zinc-400 mt-2">
                                    {selected.company}
                                </p>
                            </div>

                            <button
                                onClick={closeDetail}
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Requirement Info */}
                        <div className="p-7">
                            <div className="grid md:grid-cols-2 gap-4 mb-7">
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                                    <p className="text-xs text-zinc-500 mb-2">
                                        Budget
                                    </p>

                                    <p className="font-semibold">
                                        {selected.budget ||
                                            "Negosiasi"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                                    <p className="text-xs text-zinc-500 mb-2">
                                        Lokasi
                                    </p>

                                    <p className="font-semibold">
                                        {selected.location ||
                                            "Indonesia"}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-lg mb-3">
                                    Deskripsi kebutuhan
                                </h3>

                                <p className="text-zinc-400 whitespace-pre-line leading-7">
                                    {selected.description}
                                </p>
                            </div>

                            {/* Offers */}
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-semibold text-lg">
                                        Penawaran Solusi (
                                        {offers.length})
                                    </h3>
                                </div>

                                {loadingOffers && (
                                    <div className="py-8 text-center text-zinc-500">
                                        Memuat penawaran...
                                    </div>
                                )}

                                {!loadingOffers &&
                                    offers.length === 0 && (
                                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-7 text-center">
                                            <p className="text-zinc-500">
                                                Belum ada penawaran
                                                solusi.
                                            </p>
                                        </div>
                                    )}

                                {!loadingOffers &&
                                    offers.length > 0 && (
                                        <div className="space-y-4">
                                            {offers.map((offer) => (
                                                <div
                                                    key={offer.id}
                                                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4 mb-3">
                                                        <div>
                                                            <h4 className="text-lg font-semibold">
                                                                {
                                                                    offer.title
                                                                }
                                                            </h4>

                                                            <p className="text-sm text-zinc-500 mt-1">
                                                                {offer.user
                                                                    ?.name ||
                                                                    "Provider"}
                                                            </p>
                                                        </div>

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs border ${
                                                                offer.status ===
                                                                "accepted"
                                                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                                    : offer.status ===
                                                                      "rejected"
                                                                    ? "border-red-500/30 bg-red-500/10 text-red-400"
                                                                    : "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                                                            }`}
                                                        >
                                                            {
                                                                offer.status
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="text-zinc-400 leading-6 mb-5">
                                                        {
                                                            offer.description
                                                        }
                                                    </p>

                                                    <div className="grid md:grid-cols-2 gap-3 mb-5">
                                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                                            <p className="text-xs text-zinc-500 mb-1">
                                                                Harga
                                                            </p>

                                                            <p className="font-semibold">
                                                                {offer.price ||
                                                                    "Negosiasi"}
                                                            </p>
                                                        </div>

                                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                                            <p className="text-xs text-zinc-500 mb-1">
                                                                Estimasi
                                                            </p>

                                                            <p className="font-semibold">
                                                                {offer.delivery_time ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    {offer.status ===
                                                        "pending" && (
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    acceptOffer(
                                                                        offer.id
                                                                    )
                                                                }
                                                                className="px-4 py-3 rounded-xl border border-emerald-700 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 transition font-semibold"
                                                            >
                                                                ✓ Terima
                                                                Penawaran
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    rejectOffer(
                                                                        offer.id
                                                                    )
                                                                }
                                                                className="px-4 py-3 rounded-xl border border-red-800 bg-red-950/40 text-red-400 hover:bg-red-900/50 transition font-semibold"
                                                            >
                                                                ✕ Tolak
                                                                Penawaran
                                                            </button>
                                                        </div>
                                                    )}

                                                    {offer.status ===
                                                        "accepted" && (
                                                        <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 px-4 py-3 text-emerald-400">
                                                            ✓ Penawaran ini
                                                            diterima.
                                                        </div>
                                                    )}

                                                    {offer.status ===
                                                        "rejected" && (
                                                        <div className="rounded-xl border border-red-800 bg-red-950/30 px-4 py-3 text-red-400">
                                                            ✕ Penawaran ini
                                                            ditolak.
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function getCsrfToken() {
    const meta = document.querySelector(
        'meta[name="csrf-token"]'
    );

    return meta ? meta.getAttribute("content") : "";
}

const rootElement = document.getElementById(
    "my-requirements-app"
);

if (rootElement) {
    createRoot(rootElement).render(<MyRequirements />);
}
