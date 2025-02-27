import { BACKEND_URL } from "./constants";

export const refreshAccessToken = async () => {
  const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken.split('=')[1] }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`;

  return data.accessToken;
};

export const fetchWithAuth = async (url: string, options: RequestInit) => {
  let response = await fetch(url, options);
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    options.headers = {
      ...options.headers,
      "Authorization": `Bearer ${newAccessToken}`,
    };
    response = await fetch(url, options);
  }
  return response;
};

export const signUp = async (firstName: string, lastName: string, email: string, phone: string, dob: Date, password: string, jobTitle?: string, department?: string, employmentType?: string, workLocation?: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, phoneNumber: phone, birthDate: dob.toISOString(), password, jobTitle, department, employmentType, workLocation }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("userId", data.user.id);
  localStorage.setItem("userRole", data.user.role);
  document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`;

  return data;
};

export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("userId", data.user.id);
  localStorage.setItem("userRole", data.user.role);
  document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`;

  return data;
};

export const signOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  return !!accessToken && !!userId;
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};