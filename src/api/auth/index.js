import clientAPI from "../index";

const login = (payload) => {
  return clientAPI.post("/auth/login", payload);
};

const register = (payload) => {
  return clientAPI.post("/auth/register", payload);
};

const verifyEmail = (token) => {
  return clientAPI.post(`/auth/verify-email?token=${token}`);
};

const resetPassword = (token, payload) => {
  return clientAPI.post(`/auth/reset-password?token=${token}`, payload);
};

const forgotPassword = (payload) => {
  return clientAPI.post("/auth/forgot-password", payload);
};

// /api/auth/verify-email?token=${this.token}

export default {
  login,
  register,
  verifyEmail,
  resetPassword,
  forgotPassword,
};
