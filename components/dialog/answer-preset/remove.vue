<template>
    <v-dialog v-model="dialog" max-width="600">
      <template #activator="{ props: activatorProps }">
        <v-btn
          color="red-lighten-2"
          variant="outlined"
          :loading="loading"
          v-bind="activatorProps"
        >
          Удалить
        </v-btn>
      </template>
      <v-card
        prepend-icon="mdi-minus-circle-multiple"
        text="Вы не сможете восстановить данные после удаления, хотите продолжить?"
        title="Удалить вопрос"
      >
        <template #actions>
          <v-spacer/>
          <v-btn color="blue-lighten-1" @click="dialog = false"> Отмена </v-btn>
          <v-btn color="red-lighten-1" variant="flat" @click="approve">
            Удалить
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    id: number;
  }>();
  
  const dialog = ref(false);
  const loading = ref(false);
  
  const approve = async () => {
    // remove logic
    dialog.value = false;
  };
  </script>