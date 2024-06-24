import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearToken() {
      this.token = "";
      localStorage.removeItem("token");
    },
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    async login(credentials) {
      try {
        const response = await fetch(
          "https://product-catalog-9sk0.onrender.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          const error = new Error(data.message || "Login failed");
          error.type = "unauthorized";
          throw error;
        } else if (data.token) {
          this.setToken(data.token);
          this.setUser(data.user);
        } else {
          const error = new Error(data.message || "Login failed");
          error.errors = data.errors || [];
          throw error;
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    async register(credentials) {
      try {
        const response = await fetch(
          "https://product-catalog-9sk0.onrender.com/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        if (response.status === 400 && data.message === "User already exists") {
          const error = new Error(data.message);
          error.type = "duplicate";
          throw error;
        } else if (data.token) {
          this.setToken(data.token);
          this.setUser(data.user);
        } else {
          const error = new Error(data.message || "Registration failed");
          error.errors = data.errors || [];
          throw error;
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    logout() {
      this.clearToken();
      this.clearUser();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
