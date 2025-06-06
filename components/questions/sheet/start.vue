<template>
  <v-sheet
    border="md"
    rounded="lg"
    class="pa-6 text-white mx-auto"
    color="#141518"
    max-width="400"
  >
    <h4 class="text-h5 font-weight-bold mb-4">Тестирование</h4>

    <p class="mb-8">Хотите начать тестирование?</p>

    <v-btn
      class="text-none text-black mb-4"
      color="success"
      size="x-large"
      variant="flat"
      rounded
      block
      @click="$emit('accept')"
    >
      Начать
    </v-btn>
    <!-- <v-btn
        class="text-none text-black"
        color="green-accent-3"
        size="x-large"
        variant="outlined"
        block
      >
        Выйти
      </v-btn> -->
  </v-sheet>
</template>

<script setup lang="ts">
defineEmits(["accept"]);
</script>
