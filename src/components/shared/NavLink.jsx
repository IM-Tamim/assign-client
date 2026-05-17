'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, matchPaths = [] }) => {
    const pathname = usePathname();
    const allMatches = [href, ...matchPaths];
    const isActive = allMatches.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
    );

    return (
        <Link
            href={href}
            className={`${isActive ? "font-semibold border-b-2 border-error text-error" : "text-base-content hover:text-error transition-colors"}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;