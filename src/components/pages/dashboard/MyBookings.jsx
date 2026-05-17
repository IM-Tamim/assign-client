"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getAppointmentsByEmail, deleteAppointment } from "@/lib/doctors";
import { FiCalendar, FiClock, FiPhone, FiUser, FiTrash2, FiEdit2 } from "react-icons/fi";
import toast from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import { FaUserDoctor } from "react-icons/fa6";

const MyBookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const { data: session } = authClient.useSession();

    const email = session?.user?.email;

    useEffect(() => {
        if (!email) return;

        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const data = await getAppointmentsByEmail(email);
                setAppointments(data);
            } catch {
                toast.error("Failed to load appointments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [email]);

    const handleDelete = async (id) => {
        try {
            await deleteAppointment(id);
            setAppointments((prev) => prev.filter((a) => a._id !== id));
            toast.success("Appointment deleted successfully!");
        } catch {
            toast.error("Failed to delete appointment.");
        }
    };

    const handleUpdateSuccess = (updated) => {
        setAppointments((prev) =>
            prev.map((a) => (a._id === updated._id ? updated : a))
        );
        setSelectedAppointment(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="loading loading-spinner loading-lg text-error" />
                <p className="text-sm text-base-content/50">Loading your appointments...</p>
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                    <FiCalendar size={24} className="text-base-content/30" />
                </div>
                <p className="text-base font-semibold text-base-content/60">No appointments yet</p>
                <p className="text-sm text-base-content/40">Book your first appointment to get started.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {appointments.map((appt) => (
                    <div
                        key={appt._id}
                        className="bg-base-100 border border-base-300 rounded-2xl p-5 flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2 pb-3 border-b border-base-300">
                            <div className="w-9 h-9 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
                                <FaUserDoctor size={16} className="text-error" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-base-content">{appt.doctorName}</p>
                                <p className="text-xs text-base-content/40">Doctor</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-base-content/60 flex items-center gap-2">
                                <FiUser size={12} className="text-error shrink-0" />
                                {appt.patientName} · {appt.gender}
                            </p>
                            <p className="text-xs text-base-content/60 flex items-center gap-2">
                                <FiPhone size={12} className="text-error shrink-0" />
                                {appt.phone}
                            </p>
                            <p className="text-xs text-base-content/60 flex items-center gap-2">
                                <FiCalendar size={12} className="text-error shrink-0" />
                                {appt.appointmentDate}
                            </p>
                            <p className="text-xs text-base-content/60 flex items-center gap-2">
                                <FiClock size={12} className="text-error shrink-0" />
                                {appt.appointmentTime}
                            </p>
                            {appt.reason && (
                                <p className="text-xs text-base-content/50 italic mt-1">
                                    &ldquo;{appt.reason}&rdquo;
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2 mt-auto pt-3 border-t border-base-300">
                            <button
                                onClick={() => setSelectedAppointment(appt)}
                                className="btn btn-sm btn-error btn-outline flex-1 rounded-xl flex items-center gap-1"
                            >
                                <FiEdit2 size={13} /> Update
                            </button>
                            <button
                                onClick={() => handleDelete(appt._id)}
                                className="btn btn-sm btn-warning btn-outline flex-1 rounded-xl flex items-center gap-1"
                            >
                                <FiTrash2 size={13} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedAppointment && (
                <UpdateModal
                    appointment={selectedAppointment}
                    onSuccess={handleUpdateSuccess}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </>
    );
};

export default MyBookings;