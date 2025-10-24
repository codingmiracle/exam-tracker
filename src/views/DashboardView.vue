<template xmlns="http://www.w3.org/1999/html">
  <div>
    <nav class="navbar">
      <h1> Exam Tracker</h1>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </nav>
    <div class="dashboard">
      <h2>Willkommen zurück!</h2>
      <p>Hier ist dein Dashboard</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const handleLogout = () => {
  localStorage.removeItem('user-session');
  router.push('/login');
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffb3ba 0%, #f8f8f8 100%);
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.navbar h1 {
  color: #ff69b4;
  font-size: 24px;
}

.logout-btn {
  padding: 10px 20px;
  background: #ff69b4;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}
.content {
  padding: 40px 30px;
  max-width: 1200px;
  margin: 0 auto;
}
.content h2 {
  color: #2d2d2d;
  margin-bottom: 16px;
}

</style>
