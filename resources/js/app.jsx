import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CareerQuest from './CareerQuest';

function App() {

    const [page, setPage] = useState(
        window.location.pathname === '/register'
            ? 'register'
            : 'login'
    );

    // =========================
    // LOGIN STATE
    // =========================

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // =========================
    // REGISTER STATE
    // =========================

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);

    // =========================
    // LOGIN
    // =========================

    async function handleLogin(event) {

        event.preventDefault();

        setLoginError('');
        setLoginLoading(true);

        try {

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const response = await fetch('/login', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },

                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {

                setLoginError(
                    data.message || 'Email atau password salah.'
                );

                return;
            }

            if (data.success) {
                window.location.href = data.redirect;
            }

        } catch (error) {

            setLoginError(
                'Tidak dapat terhubung ke server Laravel.'
            );

        } finally {

            setLoginLoading(false);

        }
    }

    // =========================
    // REGISTER
    // =========================

    async function handleRegister(event) {

        event.preventDefault();

        setRegisterError('');

        if (password !== passwordConfirmation) {

            setRegisterError(
                'Konfirmasi password tidak sama.'
            );

            return;
        }

        setRegisterLoading(true);

        try {

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const response = await fetch('/register', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (!response.ok) {

                if (data.errors) {

                    const firstError =
                        Object.values(data.errors)[0]?.[0];

                    setRegisterError(
                        firstError || 'Data registrasi tidak valid.'
                    );

                } else {

                    setRegisterError(
                        data.message || 'Registrasi gagal.'
                    );

                }

                return;
            }

            if (data.success) {
                window.location.href = data.redirect;
            }

        } catch (error) {

            setRegisterError(
                'Tidak dapat terhubung ke server Laravel.'
            );

        } finally {

            setRegisterLoading(false);

        }
    }

    // =========================
    // LOGIN PAGE
    // =========================

    if (page === 'login') {

        return (

            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

                <div className="w-full max-w-md">

                    {/* Logo */}

                    <div className="text-center mb-10">

                        <h1 className="text-4xl font-bold tracking-tight">

                            AIRA

                            <span className="text-indigo-400">
                                HUB
                            </span>

                        </h1>

                        <p className="text-zinc-400 mt-3">
                            One place to build, learn, create and grow.
                        </p>

                    </div>


                    {/* Login Card */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-2xl font-semibold mb-2">
                            Welcome back 👋
                        </h2>

                        <p className="text-zinc-400 mb-8">
                            Login ke akun AIRA HUB kamu.
                        </p>


                        <form onSubmit={handleLogin}>

                            {/* Email */}

                            <div className="mb-5">

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={loginEmail}
                                    onChange={(event) =>
                                        setLoginEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                                />

                            </div>


                            {/* Password */}

                            <div className="mb-6">

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={loginPassword}
                                    onChange={(event) =>
                                        setLoginPassword(event.target.value)
                                    }
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                                />

                            </div>


                            {/* Error */}

                            {loginError && (

                                <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm">
                                    {loginError}
                                </div>

                            )}


                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 transition"
                            >

                                {loginLoading
                                    ? 'Memproses...'
                                    : 'Login'}

                            </button>

                        </form>


                        {/* Register */}

                        <p className="no-print text-center text-sm text-zinc-500 mt-6">

                            Belum punya akun?{' '}

                            <button
                                type="button"
                                onClick={() => {

                                    setPage('register');

                                    window.history.pushState(
                                        {},
                                        '',
                                        '/register'
                                    );

                                }}
                                className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                            >
                                Daftar
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        );
    }


    // =========================
    // REGISTER PAGE
    // =========================

    return (

        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-md">

                {/* Logo */}

                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold tracking-tight">

                        AIRA

                        <span className="text-indigo-400">
                            HUB
                        </span>

                    </h1>

                    <p className="text-zinc-400 mt-3">
                        One place to build, learn, create and grow.
                    </p>

                </div>


                {/* Register Card */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold mb-2">
                        Create your account 🚀
                    </h2>

                    <p className="text-zinc-400 mb-8">
                        Daftar untuk mulai menggunakan AIRA HUB.
                    </p>


                    <form onSubmit={handleRegister}>

                        {/* Name */}

                        <div className="mb-5">

                            <label className="block text-sm text-zinc-300 mb-2">
                                Nama
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Nama kamu"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                            />

                        </div>


                        {/* Email */}

                        <div className="mb-5">

                            <label className="block text-sm text-zinc-300 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                            />

                        </div>


                        {/* Password */}

                        <div className="mb-5">

                            <label className="block text-sm text-zinc-300 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Minimal 6 karakter"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                            />

                        </div>


                        {/* Confirm Password */}

                        <div className="mb-6">

                            <label className="block text-sm text-zinc-300 mb-2">
                                Konfirmasi Password
                            </label>

                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(event) =>
                                    setPasswordConfirmation(
                                        event.target.value
                                    )
                                }
                                placeholder="Ulangi password"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400"
                            />

                        </div>


                        {/* Error */}

                        {registerError && (

                            <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm">
                                {registerError}
                            </div>

                        )}


                        {/* Register Button */}

                        <button
                            type="submit"
                            disabled={registerLoading}
                            className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 transition"
                        >

                            {registerLoading
                                ? 'Mendaftarkan...'
                                : 'Daftar'}

                        </button>

                    </form>


                    {/* Back to Login */}

                    <p className="no-print text-center text-sm text-zinc-500 mt-6">

                        Sudah punya akun?{' '}

                        <button
                            type="button"
                            onClick={() => {

                                setPage('login');

                                window.history.pushState(
                                    {},
                                    '',
                                    '/login'
                                );

                            }}
                            className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                        >
                            Login
                        </button>

                    </p>

                </div>

            </div>

        </div>

    );
}


// =========================
// REACT ROOT
// =========================

const rootElement = document.getElementById('app');

if (window.location.pathname === '/career-quest') {

    createRoot(rootElement).render(
        <CareerQuest />
    );

} else {

    createRoot(rootElement).render(
        <App />
    );

}
