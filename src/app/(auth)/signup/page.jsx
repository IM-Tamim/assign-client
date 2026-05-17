"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiGoogle } from "react-icons/si";
import { FiUser, FiMail, FiLock, FiImage, FiArrowRight } from "react-icons/fi";
import { Suspense } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.photo,
            callbackURL: "/signin",
        });

        if (error) {
            toast.error(error.message);
        } else {
            await authClient.signOut();
            toast.success("Registration Successful!");
            // After registration, always go to /signin with no callbackUrl
            // so after login they land on /home
            router.push("/signin");
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/home",
        });

        if (error) {
            toast.error(error.message);
        }
    };

    const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all bg-base-200 text-base-content border border-base-300 focus:border-primary";
    const onFocus = (e) => (e.target.style.borderColor = "hsl(var(--p))");
    const onBlur = (e) => (e.target.style.borderColor = "hsl(var(--b3))");

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-linear-to-br from-base-200 via-base-300 to-base-200">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight text-primary">
                        Book<span className="text-yellow-500">Loop</span>
                    </h1>
                    <p className="text-sm mt-1 text-base-content/60">Create your account</p>
                </div>

                <div className="rounded-2xl p-8 border border-base-300 bg-base-100 shadow-2xl">
                    <form onSubmit={onSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/60">Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={15} />
                                <input name="name" type="text" placeholder="Your Name" className={inputClass} onFocus={onFocus} onBlur={onBlur} required minLength={3} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/60">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={15} />
                                <input name="email" type="email" placeholder="name@gmail.com" className={inputClass} onFocus={onFocus} onBlur={onBlur} required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/60">Photo URL</label>
                            <div className="relative">
                                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={15} />
                                <input name="photo" type="url" placeholder="https://example.com/photo.jpg" className={inputClass} onFocus={onFocus} onBlur={onBlur} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/60">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={15} />
                                <input name="password" type="password" placeholder="••••••••" className={inputClass} onFocus={onFocus} onBlur={onBlur} required minLength={8} />
                            </div>
                            <p className="text-xs text-base-content/60">At least 8 characters</p>
                        </div>

                        <div className="flex gap-3 mt-1">
                            <button
                                type="submit"
                                className="btn btn-accent btn-outline flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
                            >
                                Register <FiArrowRight size={15} />
                            </button>
                            <button
                                type="reset"
                                className="btn btn-error btn-outline px-5 py-3 rounded-xl text-sm font-medium"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 h-px bg-base-300" />
                            <span className="text-xs text-base-content/60">OR</span>
                            <div className="flex-1 h-px bg-base-300" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-primary btn-soft w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
                        >
                            <SiGoogle size={15} />
                            Continue with Google
                        </button>

                        <p className="text-center text-sm text-base-content/60">
                            Already have an account?{" "}
                            <Link href="/signin" className="font-semibold text-secondary hover:text-info">Login</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

const SignUpPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        }>
            <SignUpForm />
        </Suspense>
    );
};

export default SignUpPage;