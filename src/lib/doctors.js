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