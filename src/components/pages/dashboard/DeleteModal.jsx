"use client";
import { useState } from "react";
import { deleteAppointment } from "@/lib/doctors";
import toast from "react-hot-toast";
import { FiTrash2, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const DeleteModal = ({ appointment, onSuccess, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { data: tokenData } = await authClient.token();
            await deleteAppointment(appointment._id, tokenData?.token);
            toast.success("Appointment deleted successfully!");
            onSuccess(appointment._id);
        } catch {
            toast.error("Failed to delete appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-base-100 rounded-2xl border border-base-300 shadow-2xl w-full max-w-sm z-10">

                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center">
                        <FiTrash2 size={20} className="text-error" />
                    </div>
                    <button onClick={onClose} className="btn btn-sm btn-ghost btn-circle">
                        <FiX size={16} />
                    </button>
                </div>

                <div className="px-6 pb-6 flex flex-col gap-5">
                    <div>
                        <h3 className="font-black text-lg text-base-content">Delete Appointment</h3>
                        <p className="text-sm text-base-content/55 mt-1 leading-relaxed">
                            Are you sure you want to delete your appointment with{" "}
                            <span className="font-semibold text-base-content">{appointment.doctorName}</span>?
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-warning btn-outline flex-1 rounded-xl font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="btn btn-error flex-1 rounded-xl font-bold disabled:opacity-60"
                        >
                            {loading
                                ? <span className="loading loading-spinner loading-xs" />
                                : "Delete"
                            }
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DeleteModal;