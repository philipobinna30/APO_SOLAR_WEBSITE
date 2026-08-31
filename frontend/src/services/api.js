
const API_BASE_URL = "http://127.0.0.1:8000";

// ============================================================
// GENERIC API REQUEST
// ============================================================

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      "Something went wrong while communicating with the server.";

    throw new Error(message);
  }

  return data;
}


// ============================================================
// AUTHENTICATION
// ============================================================

export async function registerAdmin(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}


export async function loginUser(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (data.access_token) {
    localStorage.setItem(
      "apo_solar_token",
      data.access_token
    );
  }

  return data;
}


export function logoutUser() {
  localStorage.removeItem("apo_solar_token");
}


export function getAuthToken() {
  return localStorage.getItem("apo_solar_token");
}


export async function getCurrentUser() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  return apiRequest("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// ============================================================
// CONTACT MESSAGE
// ============================================================

export async function submitContactMessage(contactData) {
  return apiRequest("/contact/", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
}


export async function getContactMessages() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest("/contact/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function getContactMessage(messageId) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/contact/${messageId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function updateContactMessage(
  messageId,
  updateData
) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/contact/${messageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
}


export async function deleteContactMessage(messageId) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/contact/${messageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// ============================================================
// QUOTE REQUEST
// ============================================================

export async function submitQuoteRequest(quoteData) {
  return apiRequest("/quote/", {
    method: "POST",
    body: JSON.stringify(quoteData),
  });
}


export async function getQuoteRequests() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest("/quote/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function getQuoteRequest(quoteId) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/quote/${quoteId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function updateQuoteRequest(
  quoteId,
  updateData
) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/quote/${quoteId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
}


export async function deleteQuoteRequest(quoteId) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  return apiRequest(`/quote/${quoteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// ============================================================
// API HEALTH CHECK
// ============================================================

export async function checkApiHealth() {
  return apiRequest("/health", {
    method: "GET",
  });
}


// ============================================================
// API BASE URL
// ============================================================

export { API_BASE_URL };
