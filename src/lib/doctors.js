const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
 
 
export const getAllDoctors = async () => {
    const res = await fetch(`${API_URL}/doctors`);
    return res.json();
};
 
export const getDoctorById = async (id) => {
    const res = await fetch(`${API_URL}/doctors/${id}`);
    return res.json();
};

export const bookAppointment = async (appointmentData) => {
    const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
    });
    return res.json();
};

export const getAppointmentsByEmail = async (email) => {
    const res = await fetch(`${API_URL}/appointments?email=${email}`);
    return res.json();
};

export const updateAppointment = async (id, updatedData) => {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return res.json();
};
 
export const deleteAppointment = async (id) => {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: "DELETE",
    });
    return res.json();
};

export const addReview = async (doctorId, reviewData) => {
    const res = await fetch(`${API_URL}/doctors/${doctorId}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
    });
    return res.json();
};