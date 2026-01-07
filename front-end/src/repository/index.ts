const ambiente = import.meta.env.VITE_AMBIENTE_API;

export const getTotalWarnings = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings/get-all`);
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalReceptors = async () => {
  try {
    const response = await fetch(`${ambiente}/receptors/get-all`);
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalMessages = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalWarningLogs = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};

export const getTotalEmails = async () => {
  try {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
    const total = await response.json();
    return total.length;
  } catch (error) {
    throw error;
  }
};



    
  

