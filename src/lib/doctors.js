const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
 
 
export const getAllDoctors = async () => {
    const res = await fetch(`${API_URL}/doctors`);
    return res.json();
};
 
export const getDoctorById = async (id) => {
    const res = await fetch(`${API_URL}/doctors/${id}`);
    return res.json();
};