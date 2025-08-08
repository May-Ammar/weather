<template>
  <v-container
    class="landing-page fill-height d-flex flex-column justify-center align-center text-center"
  >
    <div class="overlay"></div>
    <div class="content">
      <h1 class="mb-4">🌤️ مرحبًا بك في تطبيق الطقس الاحترافي</h1>
      <p class="mb-6">اكتشف حالة الطقس وتوقعات الأيام القادمة بسرعة وسهولة</p>
      <router-link to="/weather">
        <v-btn color="primary" large class="landing-btn">ابدأ الآن</v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup></script>

<style scoped>
.landing-page {
  position: relative;
  background: url("../assets/1.jpg") center/cover no-repeat;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(33, 32, 32, 0.6);
}

.content {
  position: relative;
  z-index: 1;
  animation: fadeIn 1.5s ease;
}

h1 {
  font-weight: 1000;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  font-size: 2.8rem;
}

p {
  font-size: 1.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
}

.landing-btn {
  font-weight: bold;
  text-transform: none;
  transition: transform 0.4s;
}

.landing-btn:hover {
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
