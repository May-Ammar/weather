import { createRouter, createWebHistory } from "vue-router";
import TodayWeather from "../views/TodayWeather.vue";
import ForeCastView from "@/views/ForecastView.vue";
import HomeView from "@/views/HomeView.vue";
import LandingPage from "@/views/LandingPage.vue";
const routes = [
  { path: "/weather", name: "Today", component: TodayWeather },
  { path: "/forecast", name: "Forecast", component: ForeCastView },
  { path: "/home", name: "Home", component: HomeView },
  { path: "/", component: LandingPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
