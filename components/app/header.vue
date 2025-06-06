<template>
  <v-app-bar name="app-bar">
    <h1 class="mx-auto">Checklist</h1>

    <v-btn
      :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      text="Тема"
      slim
      @click="toggleTheme"
    />
    <v-btn
      prepend-icon="mdi-exit-to-app"
      text="Выйти"
      slim
      @click="
        () => {
          //TODO: exit
        }
      "
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const vuetifyTheme = useTheme();
const theme = ref("dark");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  vuetifyTheme.global.name.value = theme.value;
};
</script>
