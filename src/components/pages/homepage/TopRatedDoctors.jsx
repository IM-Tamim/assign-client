import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import DoctorCard from "@/components/ui/DoctorCard";
import { getAllDoctors } from "@/lib/doctors";


const TopRatedDoctors = async () => {
    const doctors = await getAllDoctors();
    const topDoctors = doctors.sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <section className="bg-base-200 py-16">
            <div className="container mx-auto px-4">

                <div className="text-center mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-error mb-2">
                        Our Best
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content">
                        Top Rated <span className="text-error">Doctors</span>
                    </h2>
                    <p className="text-sm text-base-content/60 mt-2 max-w-md mx-auto">
                        Handpicked specialists with the highest patient ratings and years of experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topDoctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>


                <div className="text-center mt-10">
                    <Link
                        href="/all-appointments"
                        className="btn btn-error btn-outline rounded-xl font-bold flex items-center gap-2 mx-auto w-fit"
                    >
                        View All Doctors <FiArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default TopRatedDoctors;