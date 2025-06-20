<template>
  <v-container>
    <v-row>
      <v-col cols="12" justify="center">
        <v-card class="mt-8 mx-auto overflow-visible">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
            rounded="lg"
          >
            <v-sparkline
              :labels="labels"
              :model-value="graph"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              Общее количество ответов
            </div>
            <div class="subheading font-weight-light text-grey" />
            <v-divider class="my-2" />
            <v-icon class="me-2" size="small"> mdi-clock </v-icon>
            <span class="text-caption text-grey font-weight-light"
              >Количество ответов зв последние 7 дней</span
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" justify="center">
        <v-card title="Ответы" flat>
          <template #text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />
          </template>

          <v-data-table :headers="headers" :items="answers" :search="search" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const questionsStore = useQuestionStore();

onMounted(async () => await questionsStore.getAnswers());
const typesTranscription = ref({
  correct: "вопрос/ответ",
  description: "развернутый ответ",
  count: "числовой ответ",
});
const onBeforeStartTranscription = ref({
  true: "В начале",
  false: "В конце",
});
const answers = computed(() =>
  questionsStore.answers.map((el) => ({
    type: typesTranscription.value[el?.type],
    question: el?.fieldDescription,
    answer:
      el?.correct?.toString() === "true"
        ? "верно"
        : el?.correct?.toString() === "false"
        ? "не верно"
        : el?.description || el?.count,
    userName: el?.Post?.User?.login,
    date: el?.createdAt.toString().split("T")[0],
  }))
);

const labels = ref(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
const graph = computed(() =>
  answers.value.map((el) => new Date(el.date).getDay())
);
const search = ref("");
const headers = [
  { key: "type", title: "Тип" },
  { key: "question", title: "Вопрос" },
  { key: "answer", title: "Ответ" },
  { key: "userName", title: "Логин пользователя" },
  { key: "date", title: "Дата ответа" },
];
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
