<template>
    <v-dialog v-model="dialog" max-width="600">
      <template #activator="{ props: activatorProps }">
        <v-btn
          icon="mdi-plus"
          size="small"
          color="success"
          :loading="loading"
          v-bind="activatorProps"
        />
      </template>
      <v-card prepend-icon="mdi-plus-circle-multiple" title="Добавить вопрос">
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
                v-model="data.location"
                label="Тип*"
                required
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="data.type"
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
          <v-btn text="Close" variant="plain" @click="dialog = false"/>
          <v-btn
            color="success"
            text="Add"
            variant="tonal"
            @click="approve"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
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
      data.value.location === "" ||
      data.value.type === ""
    ) {
      return;
    }
    // approve logic
    dialog.value = false;
  };
  </script>