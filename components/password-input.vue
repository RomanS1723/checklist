<template>
  <v-text-field
    v-bind="$attrs"
    :label="label"
    required
    variant="outlined"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :rules="passwordRules"
    @click:append-inner="showPassword = !showPassword"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "Пароль",
  },
});
const showPassword = ref(false);
const passwordRules = ref([
  (value: string) => {
    if (value) return true;

    return "Обязательно для заполнения.";
  },
  (value: string) => {
    if (value.length >= 6) return true;

    return "Минииуи 6 символов.";
  },
]);
</script>
