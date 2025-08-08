<template>
  <v-container class="text-center forecast-container" fluid>
    <h1 class="my-5 text-white">🌦️ توقعات الطقس لـ 5 أيام</h1>

    <v-text-field
      v-model="city"
      label="اسم المدينة"
      @keyup.enter="getForecast"
      outlined
      color="primary"
      class="forecast-input"
      hide-details
    ></v-text-field>

    <v-btn color="blue-darken-3" dark @click="getForecast">جلب التوقعات</v-btn>

    <v-alert type="error" v-if="error" class="mt-3">{{ error }}</v-alert>

    <v-row v-if="forecast.length" class="mt-5" dense>
      <v-col
        v-for="(day, index) in forecast"
        :key="index"
        cols="12"
        sm="6"
        md="2"
        class="forecast-card"
      >
        <v-card elevation="4" class="animated-card">
          <v-card-title class="text-h6 text-primary">{{
            formatDate(day.dt_txt)
          }}</v-card-title>
          <img
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            width="80"
            class="mx-auto"
          />
          <v-card-text>
            <div class="text-grey-darken-1">
              {{ day.weather[0].description }}
            </div>
            <div class="text-h6 font-weight-bold">
              {{ Math.round(day.main.temp) }}°C
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <router-link to="/">
      <v-btn
        class="mt-5"
        variant="outlined"
        color="white"
        prepend-icon="mdi-arrow-left"
      >
        الرجوع
      </v-btn>
    </router-link>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const city = ref("");
const forecast = ref([]);
const error = ref("");
const API_KEY = "d8a227723889df7c9e085f727014eeb7";

function formatDate(dt) {
  return new Date(dt).toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

async function getForecast() {
  if (!city.value) return;
  forecast.value = [];
  error.value = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&lang=ar&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("المدينة غير موجودة");

    const data = await res.json();
    forecast.value = data.list.filter((item, index) => index % 8 === 0);
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style scoped>
.forecast-container {
  min-height: 100vh;
  background-image: url("../assets/1.jpg");
  background-size: cover;
  padding: 2rem;
  overflow-x: hidden;
}

.forecast-input {
  max-width: 500px;
  margin: 0 auto 1rem auto;
  background: rgb(234, 234, 239);
  border-radius: 8px;
}

.forecast-card {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.forecast-card:nth-child(1) {
  animation-delay: 0.2s;
}
.forecast-card:nth-child(2) {
  animation-delay: 0.4s;
}
.forecast-card:nth-child(3) {
  animation-delay: 0.6s;
}
.forecast-card:nth-child(4) {
  animation-delay: 0.8s;
}
.forecast-card:nth-child(5) {
  animation-delay: 1s;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-card {
  transition: transform 0.3s ease;
}
.animated-card:hover {
  transform: scale(1.05);
}
</style>
