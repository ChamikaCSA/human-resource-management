import { BACKEND_URL } from "./constants";

export const getUsers = async (page: number, limit: number, searchQuery?: string, jobTitle?: string) => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (searchQuery) params.append('searchQuery', searchQuery);
  if (jobTitle) params.append('jobTitle', jobTitle);

  const response = await fetch(`${BACKEND_URL}/users?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return {
    users: data.users,
    total: data.total,
  };
};

export const getJobTitles = async () => {
  const response = await fetch(`${BACKEND_URL}/users/job-titles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job titles");
  }

  return response.json();
};