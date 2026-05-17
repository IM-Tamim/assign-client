import DoctorsSearch from "@/components/pages/all-appointments/DoctorsSearch";

export const metadata = {
    title: "All Appointments | DocAppoint",
    description: "Browse all available doctors and book your appointment instantly.",
};

const AllAppointmentPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`, {
        cache: "no-store",
    });
    const doctors = await res.json();

    return (
        <div className="min-h-screen bg-base-200">

            {/* Header */}
            <div className="bg-base-100 border-b border-base-300">
                <div className="container mx-auto px-4 py-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-error mb-2">
                        Find Your Doctor
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black text-base-content">
                        All <span className="text-error">Appointments</span>
                    </h1>
                    <p className="text-sm text-base-content/60 mt-2 max-w-md mx-auto">
                        Browse our qualified doctors and book your appointment instantly.
                    </p>
                </div>
            </div>

            {/* Search + Grid — client component takes over here */}
            <div className="container mx-auto px-4 py-10">
                <DoctorsSearch doctors={doctors} />
            </div>
        </div>
    );
};

export default AllAppointmentPage;