'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";
import ThemeController from "./ThemeController";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const links = <>
        <li><NavLink href="/home">Home</NavLink></li>
        <li><NavLink href="/all-appointments">All Appointment</NavLink></li>
        <li><NavLink href="/dashboard">Dashboard</NavLink></li>
    </>

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/85 border-b border-base-300 shadow-lg">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content/70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow-xl bg-base-200 border border-error/15"
                        >
                            {links}
                        </ul>
                    </div>
                    <div className="text-xl font-black hidden tracking-tight lg:flex items-center gap-1">
                        <Image src={logo} alt="Logo" width={40} height={40} />
                        <Link href={'/home'} className="font-bold">
                            <span className="text-base-content">Doc</span><span className="text-error">Appoint</span>
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    <ThemeController />

                    {isPending ? (
                        <span className="loading loading-spinner text-secondary"></span>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium truncate max-w-20 text-base-content/70">
                                {user?.name || "User"}
                            </span>
                            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-primary/40 bg-primary/10 flex items-center justify-center">
                                {user?.image && user.image.startsWith("http") ? (
                                    <Image
                                        src={user.image}
                                        alt="User Avatar"
                                        width={36}
                                        height={36}
                                        className="object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.classList.add('show-fallback');
                                        }}
                                    />
                                ) : null}
                                <span className={`text-sm font-semibold text-primary ${user?.image && user.image.startsWith("http") ? 'hidden' : 'show-fallback'}`}>
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            </div>
                            <button
                                className="btn btn-sm btn-error btn-soft rounded-lg text-sm font-medium"
                                onClick={async () => {
                                    await authClient.signOut();
                                    toast.success("Logged out successfully!");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/signin"
                                className="btn btn-sm btn-error rounded-lg text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="btn btn-sm btn-error btn-soft rounded-lg text-sm font-bold"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;