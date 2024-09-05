import { defineStore } from "pinia";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: false,
    isAdmin: false,
  }),
  actions: {
    async initAuth(): Promise<void> {
      try {
        const { data } = await useFetch("/api/auth-check");
        if (data.value) {
          this.isAuthenticated = data.value.isAuthenticated;
          this.isAdmin = data.value.isAdmin;
        } else {
          console.warn("Unexpected response format:", data);
          this.isAuthenticated = false;
          this.isAdmin = false;
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        this.isAuthenticated = false;
        this.isAdmin = false;
      }
    },
  },

  getters: {
    async getAuthAdminStatus(): Promise<boolean> {
      await this.initAuth();
      return this.isAuthenticated && this.isAdmin;
    },
  },
});
