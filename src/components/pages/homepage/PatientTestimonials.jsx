"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";
import { getAllDoctors } from "@/lib/doctors";

const StarDisplay = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <FiStar
                key={s}
                size={13}
                className={s <= rating ? "text-warning fill-warning" : "text-base-300"}
            />
        ))}
    </div>
);

const PatientTestimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const doctors = await getAllDoctors();
                const fiveStarReviews = doctors.flatMap((doc) =>
                    (doc.reviews || [])
                        .filter((r) => r.rating === 5)
                        .map((r) => ({
                            ...r,
                            doctorName: doc.name,
                            specialty: doc.specialty,
                        }))
                );
                setReviews(fiveStarReviews);
            } catch {
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <section className="bg-base-200 py-16">
                <div className="container mx-auto px-4 flex justify-center">
                    <span className="loading loading-spinner loading-lg text-error" />
                </div>
            </section>
        );
    }

    if (reviews.length === 0) return null;

    return (
        <section className="bg-base-200 py-16 overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-error mb-2">
                        Patient Stories
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content">
                        What Our <span className="text-error">Patients Say</span>
                    </h2>
                    <p className="text-sm text-base-content/60 mt-2 max-w-md mx-auto">
                        Real 5-star experiences from patients who trust DocAppoint.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={reviews.length > 3}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640:  { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-12"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 flex flex-col gap-4 h-full">

                                <StarDisplay rating={review.rating} />

                                <p className="text-sm text-base-content/65 leading-relaxed flex-1">
                                    &ldquo;{review.comment}&rdquo;
                                </p>

                                <div className="flex items-center gap-3 pt-3 border-t border-base-300">
                                    <div className="w-10 h-10 rounded-full bg-error/10 border border-error/20 flex items-center justify-center text-xs font-black text-error shrink-0">
                                        {review.userName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-base-content">{review.userName}</p>
                                        <p className="text-xs text-base-content/45">
                                            Patient of {review.doctorName}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default PatientTestimonials;