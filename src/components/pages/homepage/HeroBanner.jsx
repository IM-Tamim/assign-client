import Link from "next/link";
import { FiArrowRight, FiSearch, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { getAllDoctors } from "@/lib/doctors";

const steps = [
    {
        icon: FiSearch,
        title: "Find a Doctor",
        desc: "Browse specialists by name or specialty from our verified doctor list.",
    },
    {
        icon: FiCalendar,
        title: "Book Appointment",
        desc: "Pick a convenient time slot and fill in your details in seconds.",
    },
    {
        icon: FiCheckCircle,
        title: "Get Confirmed",
        desc: "Receive instant confirmation and visit your doctor stress-free.",
    },
];

const HeroBanner = async () => {
    const doctors = await getAllDoctors();

    const totalDoctors = doctors.length;
    const avgRating = (doctors.reduce((sum, d) => sum + d.rating, 0) / totalDoctors).toFixed(1);
    const totalReviews = doctors.reduce((sum, d) => sum + d.totalReviews, 0);
    const specialties = [...new Set(doctors.map((d) => d.specialty))].length;

    const stats = [
        { value: `${totalDoctors}+`, label: "Doctors" },
        { value: `${totalReviews.toLocaleString()}+`, label: "Patient Reviews" },
        { value: `${avgRating}★`, label: "Avg Rating" },
        { value: `${specialties}+`, label: "Specialties" },
    ];

    return (
        <section className="relative bg-base-100 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-error/5 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    <div className="flex-1 text-center lg:text-left">

                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-error bg-error/10 px-4 py-1.5 rounded-full mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-error" />
                            Trusted Healthcare Platform
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content leading-tight">
                            Your Health, <br />
                            Our{" "}
                            <span className="text-error relative inline-block">
                                Priority
                                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                    <path d="M0 6 Q50 0 100 4 Q150 8 200 3" stroke="hsl(var(--er))" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                </svg>
                            </span>
                        </h1>

                        <p className="mt-6 text-base text-base-content/60 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Connect with top-rated doctors across all specialties. Skip the waiting room — schedule your visit in seconds and get the care you deserve.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                            <Link
                                href="/all-appointments"
                                className="btn btn-error rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-error/20"
                            >
                                Book Appointment <FiArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-base-200 border border-base-300 rounded-2xl px-3 py-4 flex flex-col items-center lg:items-start gap-0.5"
                                >
                                    <p className="text-xl font-black text-error">{stat.value}</p>
                                    <p className="text-xs text-base-content/50">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md">
                        <div className="bg-base-200 border border-base-300 rounded-3xl p-6">

                            <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-6">
                                How It Works
                            </p>

                            <div className="flex flex-col gap-0">
                                {steps.map((step, i) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={step.title} className="flex gap-4">

                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center shrink-0">
                                                    <Icon size={18} className="text-error" />
                                                </div>
                                                {i < steps.length - 1 && (
                                                    <div className="w-px flex-1 bg-base-300 my-2" />
                                                )}
                                            </div>


                                            <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-black text-error/40">0{i + 1}</span>
                                                    <p className="font-bold text-sm text-base-content">{step.title}</p>
                                                </div>
                                                <p className="text-xs text-base-content/50 leading-relaxed">{step.desc}</p>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-6 pt-5 border-t border-base-300">
                                <Link
                                    href="/all-appointments"
                                    className="btn btn-error w-full rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    Get Started <FiArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBanner;