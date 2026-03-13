import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// Add interceptor to handle token refresh

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isLoginRequest = originalRequest.url.includes("/auth/login")
    const isRefreshRequest = originalRequest.url.includes("/auth/refresh-token")
    const isVerifyEmailRequest =
      originalRequest.url.includes("/auth/verify-email")

    if (isLoginRequest || isRefreshRequest || isVerifyEmailRequest) {
      return Promise.reject(error)
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        await api.get("/auth/refresh-token")
        return api(originalRequest)
      } catch (refreshError) {
        console.error("Refresh token expired")
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
