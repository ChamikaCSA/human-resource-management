import { BACKEND_URL } from "./constants";
import { Leave } from "../app/leave/types";
import { fetchWithAuth } from "./auth";

export const getLeaves = async (userId: string): Promise<{ leaves: Leave[], total: number }> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaves");
  }

  const data = await response.json();
  return {
    leaves: data.leaves,
    total: data.total,
  };
};

export const applyLeave = async (leaveType: string, startDate: string, startDateStartTime: string, startDateEndTime: string, endDate: string, endDateStartTime: string, endDateEndTime: string, comments: string, userId: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ leaveType, startDate, startDateStartTime, startDateEndTime, endDate, endDateStartTime, endDateEndTime, comments, status: 'Pending', userId }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const updateLeave = async (id: string, leaveType: string, startDate: string, startDateStartTime: string, startDateEndTime: string, endDate: string, endDateStartTime: string, endDateEndTime: string, comments: string, status: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ leaveType, startDate, startDateStartTime, startDateEndTime, endDate, endDateStartTime, endDateEndTime, comments, status }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const deleteLeave = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getSubordinateLeaves = async (supervisorId: string): Promise<{ leaves: Leave[], userName: string }> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/subordinates?supervisorId=${supervisorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch subordinate leaves");
  }

  const data = await response.json();
  return { leaves: data.leaves, userName: data.userName };
};

export const approveLeave = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/${id}/approve`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const rejectLeave = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/${id}/reject`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getLeaveBalance = async (userId: string): Promise<{ medical: number, casual: number }> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetchWithAuth(`${BACKEND_URL}/leaves/balance/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leave balance");
  }

  return response.json();
};