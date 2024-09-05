<template>
  <div class="flex justify-center items-center mt-24">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-sm bg-gray-50 shadow-lg rounded-lg p-6 space-y-4"
      aria-describedby="login-description"
    >
      <p id="login-description" class="sr-only">
        Formularz logowania do konta administratora
      </p>

      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
        />
      </div>

      <div>
        <label
          for="twoFactorCode"
          class="block text-sm font-medium text-gray-700"
        >
          2FA Code
        </label>
        <input
          id="twoFactorCode"
          v-model="twoFactorCode"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        aria-busy="loading"
        aria-live="polite"
      >
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>

      <div
        v-if="error"
        class="text-red-500 text-sm text-center mt-2"
        role="alert"
      >
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const twoFactorCode = ref("");
const error = ref(null);
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await useFetch("/admin-login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
        twoFactorCode: twoFactorCode.value,
      },
    });
    if (response.data?.value?.isAdmin) return router.push("/aktualnosci");
    error.value = response.error?.value?.statusMessage;
  } catch (err) {
    error.value = "An error occurred during login";
  } finally {
    loading.value = false;
  }
};
</script>
