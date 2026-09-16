import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
    "Semua",
    "Software",
    "Hardware",
    "IoT",
    "AI",
    "Automation",
];

export default function Solutions() {
    const [requirements, setRequirements] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");

    const [selected, setSelected] = useState(null);

    const [showPost, setShowPost] = useState(false);
    const [showOffer, setShowOffer] = useState(false);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");

    const [currentUser, setCurrentUser] = useState(null);

    const [offers, setOffers] = useState([]);
    const [offersLoading, setOffersLoading] = useState(false);
    const [offersError, setOffersError] = useState("");

    const [offerSubmitting, setOfferSubmitting] = useState(false);
    const [offerError, setOfferError] = useState("");
    const [offerSuccess, setOfferSuccess] = useState("");

    const [offerActionLoading, setOfferActionLoading] = useState(null);
    const [offerActionError, setOfferActionError] = useState("");
    const [offerActionSuccess, setOfferActionSuccess] = useState("");

    const [form, setForm] = useState({
        title: "",
        company: "",
        category: "Software",
        budget: "",
        location: "Indonesia",
        description: "",
    });

    const [offerForm, setOfferForm] = useState({
        title: "",
        description: "",
        price: "",
        delivery_time: "",
    });

    // =========================================================
    // AUTH CHECK
    // =========================================================

    useEffect(() => {
        fetch("/api/auth-check", {
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    return null;
                }

                return await response.json();
            })
            .then((data) => {
                if (data?.user?.id) {
                    setCurrentUser(data.user);
                }
            })
            .catch(() => {
                setCurrentUser(null);
            });
    }, []);

    // =========================================================
    // LOAD REQUIREMENTS
    // =========================================================

    useEffect(() => {
        loadRequirements();
    }, []);

    async function loadRequirements() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/requirements", {
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Gagal mengambil data requirement."
                );
            }

            setRequirements(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(
                err.message || "Terjadi kesalahan saat mengambil requirement."
            );
        } finally {
            setLoading(false);
        }
    }

    // =========================================================
    // LOAD OFFERS
    // =========================================================

    useEffect(() => {
        if (!selected?.id) {
            setOffers([]);
            return;
        }

        loadOffers(selected.id);
    }, [selected?.id]);

    async function loadOffers(requirementId) {
        setOffersLoading(true);
        setOffersError("");

        try {
            const response = await fetch(
                `/api/requirements/${requirementId}/offers`,
                {
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            const data = contentType.includes("application/json")
                ? await response.json()
                : [];

            if (!response.ok) {
                throw new Error(
                    data?.message || "Gagal mengambil penawaran."
                );
            }

            setOffers(Array.isArray(data) ? data : []);
        } catch (err) {
            setOffers([]);
            setOffersError(
                err.message || "Gagal mengambil penawaran solusi."
            );
        } finally {
            setOffersLoading(false);
        }
    }

    // =========================================================
    // FILTER
    // =========================================================

    const filtered = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return requirements.filter((item) => {
            const categoryMatch =
                category === "Semua" ||
                item.category === category;

            const text = [
                item.title,
                item.company,
                item.category,
                item.description,
                item.location,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const searchMatch =
                !keyword || text.includes(keyword);

            return categoryMatch && searchMatch;
        });
    }, [requirements, search, category]);

    // =========================================================
    // FORM HELPERS
    // =========================================================

    function updateForm(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function openPostForm() {
        setFormError("");
        setShowPost(true);
    }

    function closePostForm() {
        setShowPost(false);
        setFormError("");
    }

    function openOfferForm(requirement) {
        setSelected(requirement);

        setOfferError("");
        setOfferSuccess("");

        setOfferForm({
            title: "",
            description: "",
            price: "",
            delivery_time: "",
        });

        setShowOffer(true);
    }

    function closeOfferForm() {
        setShowOffer(false);
        setOfferError("");
        setOfferSuccess("");
    }

    // =========================================================
    // CREATE REQUIREMENT
    // =========================================================

    async function handleSubmit(e) {
        e.preventDefault();

        setFormError("");
        setSubmitting(true);

        try {
            const response = await fetch("/api/requirements", {
                credentials: "same-origin",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            const contentType =
                response.headers.get("content-type") || "";

            const data = contentType.includes("application/json")
                ? await response.json()
                : {};

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 419
                ) {
                    throw new Error(
                        "Sesi login tidak valid. Silakan login kembali."
                    );
                }

                const validationMessage = data?.errors
                    ? Object.values(data.errors)
                          .flat()
                          .join(" ")
                    : data?.message;

                throw new Error(
                    validationMessage ||
                        "Requirement gagal dibuat."
                );
            }

            if (data?.data) {
                setRequirements((current) => [
                    data.data,
                    ...current,
                ]);
            } else {
                await loadRequirements();
            }

            setForm({
                title: "",
                company: "",
                category: "Software",
                budget: "",
                location: "Indonesia",
                description: "",
            });

            setShowPost(false);
        } catch (err) {
            setFormError(
                err.message ||
                    "Terjadi kesalahan saat membuat requirement."
            );
        } finally {
            setSubmitting(false);
        }
    }

    // =========================================================
    // CREATE OFFER
    // =========================================================

    async function handleOfferSubmit(e) {
        e.preventDefault();

        if (!selected?.id) {
            setOfferError("Requirement tidak ditemukan.");
            return;
        }

        setOfferError("");
        setOfferSuccess("");
        setOfferSubmitting(true);

        try {
            const response = await fetch(
                `/api/requirements/${selected.id}/offers`,
                {
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(offerForm),
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            const data = contentType.includes("application/json")
                ? await response.json()
                : {};

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 419
                ) {
                    throw new Error(
                        "Sesi login tidak valid. Silakan login kembali."
                    );
                }

                const validationMessage = data?.errors
                    ? Object.values(data.errors)
                          .flat()
                          .join(" ")
                    : data?.message;

                throw new Error(
                    validationMessage ||
                        "Penawaran gagal dikirim."
                );
            }

            setOfferSuccess(
                data?.message ||
                    "Penawaran solusi berhasil dikirim."
            );

            setOfferForm({
                title: "",
                description: "",
                price: "",
                delivery_time: "",
            });

            await loadOffers(selected.id);
        } catch (err) {
            setOfferError(
                err.message ||
                    "Terjadi kesalahan saat mengirim penawaran."
            );
        } finally {
            setOfferSubmitting(false);
        }
    }

    // =========================================================
    // ACCEPT / REJECT OFFER
    // =========================================================

    async function updateOfferStatus(offer, status) {
        if (!selected?.id || !offer?.id) {
            return;
        }

        setOfferActionError("");
        setOfferActionSuccess("");
        setOfferActionLoading(offer.id);

        try {
            const response = await fetch(
                `/api/requirements/${selected.id}/offers/${offer.id}/${status}`,
                {
                    credentials: "same-origin",
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            const data = contentType.includes("application/json")
                ? await response.json()
                : {};

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 419
                ) {
                    throw new Error(
                        "Sesi login tidak valid. Silakan login kembali."
                    );
                }

                if (response.status === 403) {
                    throw new Error(
                        "Hanya pemilik requirement yang dapat menerima atau menolak penawaran."
                    );
                }

                throw new Error(
                    data?.message ||
                        "Status penawaran gagal diperbarui."
                );
            }

            // Update offer langsung di tampilan
            setOffers((current) =>
                current.map((item) =>
                    item.id === offer.id
                        ? {
                              ...item,
                              ...(data?.data || {}),
                              status:
                                  data?.data?.status ||
                                  status === "accept"
                                      ? "accepted"
                                      : "rejected",
                          }
                        : item
                )
            );

            // Ambil ulang dari database
            await loadOffers(selected.id);

            setOfferActionSuccess(
                data?.message ||
                    (status === "accept"
                        ? "Penawaran berhasil diterima."
                        : "Penawaran berhasil ditolak.")
            );
        } catch (err) {
            setOfferActionError(
                err.message ||
                    "Terjadi kesalahan saat memproses penawaran."
            );
        } finally {
            setOfferActionLoading(null);
        }
    }

    // =========================================================
    // OWNERSHIP
    // =========================================================

    const isRequirementOwner =
        currentUser &&
        selected &&
        Number(currentUser.id) === Number(selected.user_id);

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center"
                    >
                        <img
                            src="/images/logo-aira.png"
                            alt="AIRA HUB"
                            className="h-10 w-auto object-contain"
                        />
                    </a>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            className="hidden sm:inline-block px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
                        >
                            Home
                        </a>

                        {currentUser && (
                            <a
                                href="/messages"
                                className="px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
                            >
                                💬 Messages
                            </a>
                        )}

                        {currentUser ? (
                            <a
                                href="/dashboard"
                                className="px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <a
                                href="/login"
                                className="px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <main>
                <section className="relative overflow-hidden border-b border-zinc-800">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl top-0 left-1/2 -translate-x-1/2" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
                        <div className="max-w-3xl">
                            <span className="inline-flex px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                                🏢 AIRA SOLUTIONS
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">
                                Masalah perusahaan.
                                <span className="block text-indigo-400">
                                    Temukan solusinya.
                                </span>
                            </h1>

                            <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-2xl">
                                Tempat perusahaan menemukan
                                penyedia solusi teknologi,
                                dari software hingga hardware,
                                IoT, AI, dan automation.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-9">
                                <button
                                    onClick={openPostForm}
                                    className="px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                                >
                                    + Post Requirement
                                </button>

                                <a
                                    href="#requirements"
                                    className="px-6 py-3.5 rounded-xl border border-zinc-700 hover:bg-zinc-900 font-semibold transition text-center"
                                >
                                    Cari Kebutuhan
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REQUIREMENTS */}
                <section
                    id="requirements"
                    className="max-w-7xl mx-auto px-6 py-20"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-10">
                        <div>
                            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                                Company Requirements
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold mt-3">
                                Temukan kebutuhan perusahaan
                            </h2>

                            <p className="text-zinc-400 mt-3">
                                Lihat masalah yang sedang
                                membutuhkan solusi.
                            </p>
                        </div>

                        <div className="w-full lg:w-96">
                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Cari software, IoT, AI..."
                                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 outline-none focus:border-indigo-500 text-white placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
                        {CATEGORIES.map((item) => (
                            <button
                                key={item}
                                onClick={() =>
                                    setCategory(item)
                                }
                                className={`shrink-0 px-4 py-2 rounded-full border transition ${
                                    category === item
                                        ? "bg-indigo-500 border-indigo-500 text-white"
                                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="text-center py-20 border border-zinc-800 rounded-3xl">
                            <div className="text-3xl animate-pulse">
                                ⏳
                            </div>

                            <p className="text-zinc-400 mt-4">
                                Memuat requirement...
                            </p>
                        </div>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-3xl">
                            <div className="text-3xl">
                                ⚠️
                            </div>

                            <h3 className="text-xl font-semibold mt-4">
                                Gagal memuat data
                            </h3>

                            <p className="text-zinc-500 mt-2">
                                {error}
                            </p>

                            <button
                                onClick={loadRequirements}
                                className="mt-6 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    )}

                    {/* CARDS */}
                    {!loading &&
                        !error &&
                        filtered.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-5">
                                {filtered.map((item) => (
                                    <article
                                        key={item.id}
                                        className="rounded-3xl bg-zinc-900 border border-zinc-800 p-7 hover:border-indigo-500/50 hover:-translate-y-1 transition"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                                                {item.category}
                                            </span>

                                            <span className="text-xs text-zinc-500">
                                                {item.location ||
                                                    "Indonesia"}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-semibold mt-5">
                                            {item.title}
                                        </h3>

                                        <p className="text-zinc-500 text-sm mt-2">
                                            {item.company}
                                        </p>

                                        <p className="text-zinc-400 leading-relaxed mt-5 line-clamp-3">
                                            {item.description}
                                        </p>

                                        <div className="mt-5">
                                            <span className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                                                Status:{" "}
                                                {item.status ||
                                                    "open"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 mt-7 pt-5 border-t border-zinc-800">
                                            <div>
                                                <p className="text-xs text-zinc-600">
                                                    Budget
                                                </p>

                                                <p className="text-sm font-medium text-zinc-200 mt-1">
                                                    {item.budget ||
                                                        "-"}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setSelected(
                                                        item
                                                    )
                                                }
                                                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-indigo-500 transition font-medium"
                                            >
                                                Lihat Detail →
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                    {/* EMPTY */}
                    {!loading &&
                        !error &&
                        filtered.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                                <div className="text-4xl">
                                    🔎
                                </div>

                                <h3 className="text-xl font-semibold mt-4">
                                    Belum ada requirement
                                    yang cocok
                                </h3>

                                <p className="text-zinc-500 mt-2">
                                    Coba kata kunci atau
                                    kategori lain.
                                </p>
                            </div>
                        )}
                </section>

                {/* PROVIDER CTA */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 md:p-12">
                        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                            Solution Provider
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold mt-4">
                            Punya solusi untuk kebutuhan
                            perusahaan?
                        </h2>

                        <p className="text-zinc-400 mt-4 leading-relaxed max-w-3xl">
                            Tawarkan kemampuan, produk,
                            atau teknologi yang kamu miliki
                            kepada perusahaan yang sedang
                            mencari solusi.
                        </p>

                        <a
                            href="#requirements"
                            className="inline-flex mt-7 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition"
                        >
                            Cari Requirement →
                        </a>
                    </div>
                </section>
            </main>

            {/* =================================================
                REQUIREMENT DETAIL MODAL
            ================================================= */}

            {selected && (
                <div
                    className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm p-5 flex items-center justify-center"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-7 md:p-9"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <span className="text-indigo-400 text-sm">
                                    {selected.category}
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                                    {selected.title}
                                </h2>

                                <p className="text-zinc-500 mt-2">
                                    {selected.company}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setSelected(null)
                                }
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-zinc-400 leading-relaxed mt-7">
                            {selected.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mt-7">
                            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5">
                                <p className="text-xs text-zinc-600">
                                    Budget
                                </p>

                                <p className="mt-2 font-semibold">
                                    {selected.budget ||
                                        "-"}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5">
                                <p className="text-xs text-zinc-600">
                                    Lokasi
                                </p>

                                <p className="mt-2 font-semibold">
                                    {selected.location ||
                                        "Indonesia"}
                                </p>
                            </div>
                        </div>

                        <h3 className="font-semibold mt-8 mb-3">
                            Status Requirement
                        </h3>

                        <span className="inline-flex px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-300">
                            {selected.status ||
                                "open"}
                        </span>

                        {/* OFFERS */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="font-semibold">
                                    Penawaran Solusi (
                                    {offers.length})
                                </h3>

                                {offersLoading && (
                                    <span className="text-xs text-zinc-500">
                                        Memuat...
                                    </span>
                                )}
                            </div>

                            {offerActionError && (
                                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                                    {offerActionError}
                                </div>
                            )}

                            {offerActionSuccess && (
                                <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                                    {offerActionSuccess}
                                </div>
                            )}

                            {offersError ? (
                                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                                    {offersError}
                                </div>
                            ) : offers.length === 0 &&
                              !offersLoading ? (
                                <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-5 py-6 text-sm text-zinc-500">
                                    Belum ada penawaran
                                    untuk requirement
                                    ini.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {offers.map(
                                        (offer) => (
                                            <div
                                                key={
                                                    offer.id
                                                }
                                                className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="font-semibold text-zinc-100">
                                                            {
                                                                offer.title
                                                            }
                                                        </h4>

                                                        <p className="text-sm text-zinc-500 mt-1">
                                                            {offer
                                                                .user
                                                                ?.name ||
                                                                "Solution Provider"}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`shrink-0 px-3 py-1 rounded-full text-xs ${
                                                            offer.status ===
                                                            "accepted"
                                                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                                                                : offer.status ===
                                                                  "rejected"
                                                                ? "bg-red-500/10 border border-red-500/20 text-red-300"
                                                                : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                                                        }`}
                                                    >
                                                        {offer.status ||
                                                            "pending"}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-zinc-400 leading-relaxed mt-4">
                                                    {
                                                        offer.description
                                                    }
                                                </p>

                                                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                                                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                                                        <p className="text-xs text-zinc-600">
                                                            Harga
                                                        </p>

                                                        <p className="text-sm font-semibold mt-1">
                                                            {offer.price ||
                                                                "-"}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                                                        <p className="text-xs text-zinc-600">
                                                            Estimasi
                                                        </p>

                                                        <p className="text-sm font-semibold mt-1">
                                                            {offer.delivery_time ||
                                                                "-"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* OWNER ACTION */}
                                                {isRequirementOwner &&
                                                    offer.status ===
                                                        "pending" && (
                                                        <div className="grid sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-800">
                                                            <button
                                                                disabled={
                                                                    offerActionLoading ===
                                                                    offer.id
                                                                }
                                                                onClick={() =>
                                                                    updateOfferStatus(
                                                                        offer,
                                                                        "accept"
                                                                    )
                                                                }
                                                                className="px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50 font-semibold transition"
                                                            >
                                                                {offerActionLoading ===
                                                                offer.id
                                                                    ? "Memproses..."
                                                                    : "✓ Terima Penawaran"}
                                                            </button>

                                                            <button
                                                                disabled={
                                                                    offerActionLoading ===
                                                                    offer.id
                                                                }
                                                                onClick={() =>
                                                                    updateOfferStatus(
                                                                        offer,
                                                                        "reject"
                                                                    )
                                                                }
                                                                className="px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 disabled:opacity-50 font-semibold transition"
                                                            >
                                                                {offerActionLoading ===
                                                                offer.id
                                                                    ? "Memproses..."
                                                                    : "✕ Tolak Penawaran"}
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* OFFER BUTTON */}
                        <button
                            onClick={() =>
                                openOfferForm(selected)
                            }
                            disabled={
                                selected.status &&
                                selected.status !== "open"
                            }
                            className="w-full mt-8 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition"
                        >
                            Tawarkan Solusi
                        </button>
                    </div>
                </div>
            )}

            {/* =================================================
                POST REQUIREMENT MODAL
            ================================================= */}

            {showPost && (
                <div
                    className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm p-5 flex items-center justify-center"
                    onClick={closePostForm}
                >
                    <div
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-7 md:p-9"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <span className="text-indigo-400 text-sm">
                                    AIRA SOLUTIONS
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                                    Post Requirement
                                </h2>
                            </div>

                            <button
                                onClick={closePostForm}
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 mt-7"
                        >
                            <input
                                required
                                value={form.title}
                                onChange={(e) =>
                                    updateForm(
                                        "title",
                                        e.target.value
                                    )
                                }
                                placeholder="Judul kebutuhan"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            />

                            <input
                                required
                                value={form.company}
                                onChange={(e) =>
                                    updateForm(
                                        "company",
                                        e.target.value
                                    )
                                }
                                placeholder="Nama perusahaan"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            />

                            <select
                                value={form.category}
                                onChange={(e) =>
                                    updateForm(
                                        "category",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            >
                                {CATEGORIES.slice(1).map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>

                            <input
                                value={form.budget}
                                onChange={(e) =>
                                    updateForm(
                                        "budget",
                                        e.target.value
                                    )
                                }
                                placeholder="Budget, contoh: Rp20–50 juta"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            />

                            <input
                                value={form.location}
                                onChange={(e) =>
                                    updateForm(
                                        "location",
                                        e.target.value
                                    )
                                }
                                placeholder="Lokasi"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            />

                            <textarea
                                required
                                rows="6"
                                value={form.description}
                                onChange={(e) =>
                                    updateForm(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Jelaskan masalah dan kebutuhan perusahaan..."
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500 resize-none"
                            />

                            {formError && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                                    {formError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                            >
                                {submitting
                                    ? "Menyimpan..."
                                    : "Simpan Requirement"}
                            </button>

                            <p className="text-xs text-zinc-600 text-center">
                                Requirement akan
                                disimpan ke database
                                AIRA HUB.
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* =================================================
                OFFER MODAL
            ================================================= */}

            {showOffer && selected && (
                <div
                    className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm p-5 flex items-center justify-center"
                    onClick={closeOfferForm}
                >
                    <div
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-7 md:p-9"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <span className="text-indigo-400 text-sm">
                                    AIRA SOLUTIONS
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                                    Tawarkan Solusi
                                </h2>

                                <p className="text-zinc-500 mt-2">
                                    Untuk:{" "}
                                    {selected.title}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeOfferForm
                                }
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-7 rounded-2xl bg-zinc-950 border border-zinc-800 p-5">
                            <p className="text-xs text-zinc-600">
                                Kebutuhan perusahaan
                            </p>

                            <p className="font-semibold mt-2">
                                {selected.title}
                            </p>

                            <p className="text-sm text-zinc-500 mt-1">
                                {selected.company}
                            </p>
                        </div>

                        <form
                            onSubmit={
                                handleOfferSubmit
                            }
                            className="space-y-4 mt-6"
                        >
                            <input
                                required
                                value={
                                    offerForm.title
                                }
                                onChange={(e) =>
                                    setOfferForm(
                                        (current) => ({
                                            ...current,
                                            title: e.target
                                                .value,
                                        })
                                    )
                                }
                                placeholder="Judul solusi"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                            />

                            <textarea
                                required
                                rows="6"
                                value={
                                    offerForm.description
                                }
                                onChange={(e) =>
                                    setOfferForm(
                                        (current) => ({
                                            ...current,
                                            description:
                                                e.target
                                                    .value,
                                        })
                                    )
                                }
                                placeholder="Jelaskan solusi yang kamu tawarkan, teknologi yang digunakan, dan bagaimana solusi tersebut menjawab kebutuhan perusahaan..."
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500 resize-none"
                            />

                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    value={
                                        offerForm.price
                                    }
                                    onChange={(e) =>
                                        setOfferForm(
                                            (current) => ({
                                                ...current,
                                                price: e.target
                                                    .value,
                                            })
                                        )
                                    }
                                    placeholder="Harga / penawaran"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                                />

                                <input
                                    value={
                                        offerForm.delivery_time
                                    }
                                    onChange={(e) =>
                                        setOfferForm(
                                            (current) => ({
                                                ...current,
                                                delivery_time:
                                                    e.target
                                                        .value,
                                            })
                                        )
                                    }
                                    placeholder="Estimasi pengerjaan, contoh: 30 hari"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-500"
                                />
                            </div>

                            {offerError && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                                    {offerError}
                                </div>
                            )}

                            {offerSuccess && (
                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                                    {offerSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    offerSubmitting
                                }
                                className="w-full px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                            >
                                {offerSubmitting
                                    ? "Mengirim..."
                                    : "Kirim Penawaran →"}
                            </button>

                            <p className="text-xs text-zinc-600 text-center">
                                Penawaran akan dikirim
                                ke pemilik requirement.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
