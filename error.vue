<template>
    <div>
      <v-empty-state
        :headline="`${error?.statusCode}`"
        title="Страница не найдена"
        text="Страница, которую вы искали, не существует"
        icon="mdi-map-marker-remove-variant"
        action-text="На главную"
        @click:action="onClickAction"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { NuxtError } from "#app";
  
  const router = useRouter();
  
  defineProps({
    error: Object as () => NuxtError,
  });
  
  const onClickAction = () => {
    router.push("/");
  };
  </script>
  
  <style scoped>
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  </style>