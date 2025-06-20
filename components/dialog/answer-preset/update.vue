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
            <v-text-field v-model="data.name" label="Суть*" required />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="data.type"
              :items="Object.values(typesTranscription)"
              :rules="[(v) => !!v || 'Необходимо выбрать тип']"
              label="Тип*"
              required
            />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="data.onBeforeStart"
              :items="Object.values(onBeforeStartTranscription)"
              :rules="[(v) => !!v || 'Необходимо выбрать значение']"
              label="Положение*"
              required
            />
          </v-col>
        </v-row>
        <small class="text-caption text-medium-emphasis"
          >*указывает на обязательное поле</small
        >
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn text="Закрыть" variant="plain" @click="dialog = false" />

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

const presetStore = useAnswerPresetStore();
const current = computed(() =>
  presetStore.preset.find((el) => el.id === props.id)
);

const dialog = ref(false);
const loading = ref(false);
const typesTranscription = ref({
  correct: "вопрос/ответ",
  description: "развернутый ответ",
  count: "числовой ответ",
});
const onBeforeStartTranscription = ref({
  true: "В начале",
  false: "В конце",
});
const data = ref({
  name: current.value?.fieldDescription || "",
  type: typesTranscription.value[current.value?.type.toString()] || "",
  onBeforeStart:
    onBeforeStartTranscription.value[current.value?.onBeforeStart.toString()] ||
    "",
});

const approve = async () => {
  if (
    data.value.name === "" ||
    data.value.type === "" ||
    data.value.onBeforeStart === ""
  ) {
    return;
  }
  // approve logic
  const result = {
    fieldDescription: data.value.name,
    onBeforeStart:
      Object.keys(onBeforeStartTranscription.value).find(
        (k) => onBeforeStartTranscription.value[k] === data.value.onBeforeStart
      ) === "true",
    type: Object.keys(typesTranscription.value).find(
      (k) => typesTranscription.value[k] === data.value.type
    ),
  };
  const pr = await presetStore.adminUpdate(props.id, result);
  console.log(pr);
  dialog.value = false;
};
</script>
