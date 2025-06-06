<template>
    <v-dialog v-model="dialog" max-width="600">
      <template #activator="{ props: activatorProps }">
        <v-btn
          color="primary"
          variant="outlined"
          :loading="loading"
          v-bind="activatorProps"
        >
          Обновить
        </v-btn>
      </template>
      <v-card prepend-icon="mdi-circle-multiple" title="Обновить вопрос">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="data.name"
                label="Название*"
                required
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="data.type"
                label="Тип*"
                required
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="data.location"
                label="Описание*"
                required
              />
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis"
            >*указывает на обязательное поле</small
          >
        </v-card-text>
  
        <v-divider/>
  
        <v-card-actions>
          <v-spacer/>
  
          <v-btn text="Закрыть" variant="plain" @click="dialog = false"/>
  
          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="approve"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    id: number;
  }>();
  
  const dialog = ref(false);
  const loading = ref(false);
  const data = ref({
    name: "",
    location: "",
    type: "",
  });
  
  const approve = async () => {
    if (
      data.value.name === "" ||
      data.value.type === "" ||
      data.value.location === ""
    ) {
      return;
    }
    // approve logic here
    dialog.value = false;
  };
  </script>