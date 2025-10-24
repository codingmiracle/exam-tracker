<template>
  <div class="login-view">
    <div class="card">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <label>
          Email
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Password
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function onSubmit() {
  // Minimal placeholder behaviour: save a fake session and navigate if needed
  // In a real app you'd call an API and handle errors
  localStorage.setItem('user-session', JSON.stringify({ email: email.value }));
  // navigate to dashboard
  window.location.href = '/dashboard';
}
</script>

<style scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
  padding: 20px;
  background: linear-gradient(135deg, #f5f7ff 0%, #e0f2ff 100%);
}
.card {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 6px 18px rgba(20, 24, 40, 0.08),
    0 2px 6px rgba(20, 24, 40, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}
input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  outline: none;
}
input:focus {
  box-shadow: 0 0 0 4px rgba(41, 128, 185, 0.08);
  border-color: #2990c9;
}
button {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(180deg, #2d9cdb, #1f7fb8);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.06s ease,
    box-shadow 0.06s ease,
    opacity 0.06s ease;
}
button:active {
  transform: scale(0.99);
  box-shadow: 0 4px 10px rgba(31, 127, 184, 0.12);
}
</style>
