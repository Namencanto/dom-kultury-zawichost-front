import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const authStatus = await authStore.getAuthAdminStatus;
  if (to.path === "/admin" && authStatus) {
    return navigateTo("/aktualnosci");
  }

  if (to.path === "/nowe-wydarzenie" && !authStatus) {
    return navigateTo("/404");
  }
});
