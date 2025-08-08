<template>
  <v-container class="text-center weather-container">
    <h1 class="title">🌤️ كيف الطقس اليوم؟؟؟</h1>

    <v-text-field
      v-model="city"
      label="أدخل اسم المدينة"
      @keyup.enter="getWeather"
      outlined
      class="animated-input"
    ></v-text-field>

    <v-btn color="primary" @click="getWeather" class="weather-btn">
      عرض الطقس
    </v-btn>

    <v-alert type="error" v-if="error" class="mt-2 alert-fade">
      {{ error }}
    </v-alert>

    <v-card v-if="weather" class="mt-4 weather-card" elevation="8">
      <v-card-title>{{ weather.name }}</v-card-title>
      <v-card-text>
        <v-img :src="iconUrl" width="100" class="mx-auto" />
        <p>{{ weather.weather[0].description }}</p>
        <h2>{{ Math.round(weather.main.temp) }}°C</h2>
      </v-card-text>
    </v-card>

    <router-link to="/forecast">
      <v-btn variant="outlined" class="mt-2 forecast-btn">
        عرض توقعات 5 أيام
      </v-btn>
    </router-link>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const city = ref("");
const weather = ref(null);
const error = ref("");
const iconUrl = ref("");
const API_KEY = "d8a227723889df7c9e085f727014eeb7";

async function getWeather() {
  if (!city.value) return;
  error.value = "";
  weather.value = null;
  iconUrl.value = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&lang=ar&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("تعذر العثور على المدينة");

    const data = await res.json();
    weather.value = data;
    iconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style scoped>
/* خلفية متحركة */
.weather-container {
  min-height: 100vh;
  background-image: url("../assets/2.jpg");
  background-size: cover;
  animation: gradientBG 60s ease infinite;
  justify-content: center;
  padding: 12px;
  color: #fff;
}

/* عنوان أنيق */
.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 30px;
  animation: fadeInDown 1s ease;
}

/* الحقول */
.animated-input input {
  color: white !important;
}
.animated-input label {
  color: #f0f0f0 !important;
}
.animated-input {
  animation: fadeInUp 1s ease;
}

/* الأزرار */
.weather-btn,
.forecast-btn {
  width: 100%;
  max-width: 400px;
  margin: 12px auto;
  display: block;
  border-radius: 30px;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.weather-btn:hover,
.forecast-btn:hover {
  background-color: #ffd700 !important;
  color: black !important;
}

/* البطاقة */
.weather-card {
  background-color: rgba(255, 255, 255, 0.9);
  color: #222;
  border-radius: 20px;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
  animation: fadeInUp 2s ease;
  transition: transform 0.4s ease-in-out;
}
.weather-card:hover {
  transform: scale(1.03);
}

/* التنبيهات */
.alert-fade {
  animation: fadeInUp 1s ease;
}

/* أنيميشن للخلفية */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* أنيميشن ظهور */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
