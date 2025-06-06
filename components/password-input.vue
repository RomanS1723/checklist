<template>
  <v-text-field
    v-bind="$attrs"
    label="Пароль"
    required
    variant="outlined"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :rules="passwordRules"
    @click:append-inner="showPassword = !showPassword"
  />
</template>

<script setup lang="ts">
const showPassword = ref(false);
const passwordRules = ref([
  (value: string) => {
    if (value) return true;

    return "Обязательно для заполнения.";
  },
  (value: string) => {
    if (value.length > 6) return true;

    return "Minimum of 6 characters.";
  },
]);
</script>
