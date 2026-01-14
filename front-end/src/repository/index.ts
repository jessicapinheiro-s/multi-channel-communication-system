import type { Receptor, Warning, WarningLogSent } from "../pages/Dashboard";

const ambiente = import.meta.env.VITE_AMBIENTE_API;

export const getTotalWarnings = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings/get-all`, {
      method: "GET",
      credentials: "include",
    });
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalReceptors = async () => {
  try {
    const response = await fetch(`${ambiente}/receptors/get-all`, {
      method: "GET",
      credentials: "include",
    });
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalMessages = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`, {
      method: "GET",
      credentials: "include",
    });
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalWarningLogs = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`, {
      method: "GET",
      credentials: "include",
    });
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalEmails = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`, {
      method: "GET",
      credentials: "include",
    });
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const fetchCampaigns = async (pageParam?: number): Promise<Warning[]> => {
  const response = await fetch(`${ambiente}/warnings/get-all`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const fetchReceptors = async (pageParam?: number): Promise<Receptor[]> => {
  const response = await fetch(`${ambiente}/recipients/get-all`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const fetchMessages = async (
  pageParam?: number
): Promise<WarningLogSent[]> => {
  const response = await fetch(`${ambiente}/warnings_logs/get-all`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
