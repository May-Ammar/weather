<template>
  <v-container>
    <h1>طقس {{ weather.name }}</h1>
    <p v-if="weather.main">درجة الحرارة: {{ weather.main.temp }}°C</p>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      weather: {},
    };
  },
  mounted() {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: "Damascus",
          units: "metric",
          appid: "d8a227723889df7c9e085f727014eeb7", // استبدله بمفتاحك
        },
      })
      .then((response) => {
        this.weather = response.data;
      })
      .catch((error) => {
        console.error("خطأ في جلب الطقس:", error);
      });
  },
};
</script>
