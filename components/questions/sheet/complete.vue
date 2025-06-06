<template>
  <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112" />
    <h2 class="text-h5 mb-6">Вы завершили тестирование!</h2>
    <p class="mb-4 text-medium-emphasis text-body-2">
      <!-- Возвращайтесь в следующий раз, когда потребуется снова отметить
        <a class="text-decoration-none text-info" href="#"
          >View reconciliation report.</a
        >
        <br /> -->
      До встречи!
    </p>
    <v-divider class="mb-4" />
    <div class="text-end">
      <v-btn
        @click="$emit('done')"
        class="text-none"
        color="success"
        variant="flat"
        width="90"
        rounded
      >
        Готово
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
defineEmits(["done"]);
</script>
