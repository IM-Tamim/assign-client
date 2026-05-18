"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiSearch } from "react-icons/fi";
import DoctorCard from "@/components/ui/DoctorCard";

const DoctorsSearch = ({ doctors }) => {
    const [search, setSearch] = useState("");
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewDetails = (id) => {
        if (!session) {
            router.push("/signin");
        } else {
            router.push(`/doctors/${id}`);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto relative">
                <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                    size={16}
                />
                <input
                    type="text"
                    placeholder="Search by doctor name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content outline-none focus:border-error transition-all"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-error transition-colors text-xs"
                    >
                        ✕
                    </button>
                )}
            </div>

            <p className="text-xs text-base-content/40 mt-3">
                {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
            </p>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                    <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                        <FiSearch size={24} className="text-base-content/30" />
                    </div>
                    <p className="text-base font-semibold text-base-content/60">No doctors found</p>
                    <p className="text-sm text-base-content/40">Try searching with a different name</p>
                    <button
                        onClick={() => setSearch("")}
                        className="btn btn-sm btn-error btn-outline rounded-lg mt-2"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filtered.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default DoctorsSearch;