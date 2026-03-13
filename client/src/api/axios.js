import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend URL
  withCredentials: true, // important for cookies
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const skipUrls = [
      "/auth/login",
      "/auth/refresh-token",
      "/auth/verify-email",
    ]
    if (skipUrls.some((url) => originalRequest.url.includes(url))) {
      return Promise.reject(error)
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        await api.get("/auth/refresh-token") // sends refresh cookie automatically
        return api(originalRequest) // retry original request
      } catch (refreshError) {
        console.error("Refresh token expired")
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
