"use client";
import { useState } from "react";
import { updateAppointment } from "@/lib/doctors";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const UpdateModal = ({ appointment, onSuccess, onClose }) => {
    const [loading, setLoading] = useState(false);

    const inputClass =
        "w-full px-4 py-3 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content outline-none focus:border-error transition-all";
    const readOnlyClass =
        "w-full px-4 py-3 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content/50 cursor-not-allowed";

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const updated = {
            ...appointment,
            patientName: data.patientName,
            gender: data.gender,
            phone: data.phone,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            reason: data.reason || "",
        };

        try {
            const { data: tokenData } = await authClient.token();
            await updateAppointment(appointment._id, {
                patientName: data.patientName,
                gender: data.gender,
                phone: data.phone,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                reason: data.reason || "",
            },tokenData?.token);
            toast.success("Appointment updated successfully!");
            onSuccess(updated);
        } catch {
            toast.error("Failed to update appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Box */}
            <div className="relative bg-base-100 rounded-2xl border border-base-300 shadow-2xl w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                    <div>
                        <h3 className="font-black text-xl text-base-content">Update Appointment</h3>
                        <p className="text-sm text-base-content/50 mt-0.5">Edit your booking details</p>
                    </div>
                    <button onClick={onClose} className="btn btn-sm btn-ghost btn-circle mt-1">
                        <FiX size={16} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="px-6 pb-6 flex flex-col gap-4">

                    {/* Read-only: Doctor Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-base-content">Doctor Name</label>
                        <input
                            type="text"
                            value={appointment.doctorName}
                            readOnly
                            className={readOnlyClass}
                        />
                    </div>

                    {/* Read-only: Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-base-content">Email</label>
                        <input
                            type="text"
                            value={appointment.userEmail}
                            readOnly
                            className={readOnlyClass}
                        />
                    </div>

                    {/* Patient Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-base-content">
                            Patient Name <span className="text-error">*</span>
                        </label>
                        <input
                            name="patientName"
                            type="text"
                            defaultValue={appointment.patientName}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Gender + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-base-content">
                                Gender <span className="text-error">*</span>
                            </label>
                            <select
                                name="gender"
                                defaultValue={appointment.gender}
                                className={inputClass}
                                required
                            >
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
                                defaultValue={appointment.phone}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-base-content">
                                Date <span className="text-error">*</span>
                            </label>
                            <input
                                name="appointmentDate"
                                type="date"
                                defaultValue={appointment.appointmentDate}
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
                                defaultValue={appointment.appointmentTime}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-base-content">
                            Reason <span className="text-base-content/40 font-normal">(optional)</span>
                        </label>
                        <input
                            name="reason"
                            type="text"
                            defaultValue={appointment.reason}
                            placeholder="Brief reason for visit"
                            className={inputClass}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-warning btn-outline flex-1 rounded-xl font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-error flex-1 rounded-xl font-bold disabled:opacity-60"
                        >
                            {loading
                                ? <span className="loading loading-spinner loading-xs" />
                                : "Save Changes"
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateModal;