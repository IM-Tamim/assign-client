"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { bookAppointment } from "@/lib/doctors";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

const BookingModal = ({ doctor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();

    const inputClass =
        "w-full px-4 py-3 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content outline-none focus:border-error transition-all";

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const appointmentData = {
            userEmail: session?.user?.email,
            doctorName: doctor.name,
            doctorId: doctor._id,
            patientName: data.patientName,
            gender: data.gender,
            phone: data.phone,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            reason: data.reason || "",
        };

        try {
            const { data: tokenData } = await authClient.token();
            await bookAppointment(appointmentData, tokenData?.token);
            toast.success("Appointment booked successfully!");
            setIsOpen(false);
            e.target.reset();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-error rounded-xl font-bold shadow-lg shadow-error/20"
            >
                Book Appointment
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative bg-base-100 rounded-2xl border border-base-300 shadow-2xl w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">

                        {/* Header */}
                        <div className="flex items-start justify-between p-6 pb-4">
                            <div>
                                <h3 className="font-black text-xl text-base-content">Book Appointment</h3>
                                <p className="text-sm text-base-content/50 mt-0.5">with {doctor.name}</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn btn-sm btn-ghost btn-circle mt-1"
                            >
                                <FiX size={16} />
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="px-6 pb-6 flex flex-col gap-4">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-base-content">
                                    Patient Name <span className="text-error">*</span>
                                </label>
                                <input
                                    name="patientName"
                                    type="text"
                                    placeholder="Full name"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-base-content">
                                        Gender <span className="text-error">*</span>
                                    </label>
                                    <select name="gender" className={inputClass} required defaultValue="">
                                        <option value="" disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-base-content">
                                        Phone <span className="text-error">*</span>
                                    </label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="01XXXXXXXXX"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-base-content">
                                        Date <span className="text-error">*</span>
                                    </label>
                                    <input
                                        name="appointmentDate"
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-base-content">
                                        Time <span className="text-error">*</span>
                                    </label>
                                    <input
                                        name="appointmentTime"
                                        type="time"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-base-content">
                                    Reason <span className="text-base-content/40 font-normal">(optional)</span>
                                </label>
                                <input
                                    name="reason"
                                    type="text"
                                    placeholder="Brief reason for visit"
                                    className={inputClass}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-error w-full rounded-xl font-bold mt-1 disabled:opacity-60"
                            >
                                {loading
                                    ? <span className="loading loading-spinner loading-xs" />
                                    : "Confirm Booking"
                                }
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;