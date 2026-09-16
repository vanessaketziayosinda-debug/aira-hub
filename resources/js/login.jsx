import React, { useState } from "react";


export default function Login() {

    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | PRINT
    |--------------------------------------------------------------------------
    */

    const handlePrint = () => {
        window.print();
    };


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!email || !password) {

            setError(
                "Email dan password wajib diisi."
            );

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                "/login",
                {
                    method: "POST",

                    credentials: "same-origin",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json",

                        "X-CSRF-TOKEN":
                            document
                                .querySelector(
                                    'meta[name="csrf-token"]'
                                )
                                ?.getAttribute(
                                    "content"
                                ),
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );


            const data =
                await response.json();


            /*
            |--------------------------------------------------------------------------
            | LOGIN GAGAL
            |--------------------------------------------------------------------------
            */

            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Email atau password salah."
                );

            }


            /*
            |--------------------------------------------------------------------------
            | LOGIN BERHASIL
            |--------------------------------------------------------------------------
            */

            if (data?.success) {

                /*
                 * Laravel akan menentukan
                 * dashboard berdasarkan role.
                 *
                 * customer → /dashboard
                 * admin    → /dashboard
                 *
                 * Kemudian web.php menentukan
                 * view yang tepat.
                 */

                window.location.href =
                    data.redirect ||
                    "/dashboard";

                return;
            }


            throw new Error(
                "Login gagal."
            );


        } catch (err) {

            setError(
                err.message ||
                "Terjadi kesalahan saat login."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">


            {/* Login Area */}

            <div className="print-area w-full max-w-md">


                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">


                    {/* Logo */}

                    <div className="text-center mb-8">

                        <div className="text-2xl font-bold mb-6">

                            AIRA
                            <span className="text-indigo-400">
                                {" "}HUB
                            </span>

                        </div>


                        <h1 className="text-3xl font-bold">

                            Welcome Back

                        </h1>


                        <p className="text-zinc-400 mt-2">

                            Login to your AIRA HUB account

                        </p>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="mb-5 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">

                            {error}

                        </div>

                    )}


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* Email */}

                        <div className="mb-5">

                            <label className="block text-sm text-zinc-300 mb-2">

                                Email

                            </label>


                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-indigo-500 outline-none transition"
                            />

                        </div>


                        {/* Password */}

                        <div className="mb-6">

                            <label className="block text-sm text-zinc-300 mb-2">

                                Password

                            </label>


                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-indigo-500 outline-none transition"
                            />

                        </div>


                        {/* Sign In */}

                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In"}

                        </button>

                    </form>


                    {/* Social Login */}

                    <div className="flex gap-3 mt-5">

                        <button
                            type="button"
                            className="flex-1 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition"
                        >

                            Google

                        </button>


                        <button
                            type="button"
                            className="flex-1 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition"
                        >

                            Facebook

                        </button>

                    </div>


                </div>


                {/* Register */}

                <p className="no-print text-center text-zinc-500 text-sm mt-6">

                    Don't have an account?{" "}


                    <a
                        href="/register"
                        className="text-indigo-400 hover:text-indigo-300"
                    >

                        Sign Up

                    </a>

                </p>


            </div>

        </div>

    );

}
