export default function Login() {
const handlePrint = () => {
window.print();
};

return (
<div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

    <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    Welcome Back
                </h1>

                <p className="text-zinc-400 mt-2">
                    Login to your AIRA HUB account
                </p>
            </div>

            {/* Email */}
            <div className="mb-5">
                <label className="block text-sm text-zinc-300 mb-2">
                    Email
                </label>

                <input type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 outline-none focus:border-indigo-500" />
            </div>

            {/* Password */}
            <div className="mb-6">
                <label className="block text-sm text-zinc-300 mb-2">
                    Password
                </label>

                <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 outline-none focus:border-indigo-500" />
            </div>

            {/* Sign In */}
            <button className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition">
                Sign In
            </button>

            {/* Social */}
            <div className="flex gap-3 mt-5">

                <button className="flex-1 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
                    Google
                </button>

                <button className="flex-1 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
                    Facebook
                </button>

            </div>

        </div>

        <p className="text-center text-zinc-500 text-sm mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:text-indigo-300">
                Sign Up
            </a>
        </p>

    </div>

</div>
);
}
