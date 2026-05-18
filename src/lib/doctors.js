const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const authHeader = (token) => {
  return token ? { authorization: `Bearer ${token}` } : {};
};

export const getAllDoctors = async () => {
  const res = await fetch(`${API_URL}/doctors`, { cache: "no-store" });
  return res.json();
};

export const getDoctorById = async (id, token) => {
  const res = await fetch(`${API_URL}/doctors/${id}`, {
    cache: "no-store",
    headers: authHeader(token),
  });
  return res.json();
};

export const getAppointmentsByEmail = async (email, token) => {
    const res = await fetch(`${API_URL}/appointments?email=${email}`, {
        headers: authHeader(token),
    });
    return res.json();
};

export const bookAppointment = async (appointmentData, token) => {
    const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        body: JSON.stringify(appointmentData),
    });
    return res.json();
};

export const updateAppointment = async (id, updatedData, token) => {
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteAppointment = async (id, token) => {
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

export const addReview = async (doctorId, reviewData, token) => {
  const res = await fetch(`${API_URL}/doctors/${doctorId}/review`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(reviewData),
  });
  return res.json();
};
