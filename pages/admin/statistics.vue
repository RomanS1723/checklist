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
              :model-value="value"
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
        <v-card title="Nutrition" flat>
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

          <v-data-table
            :headers="headers"
            :items="questions"
            :search="search"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const labels = ref(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
const value = ref([0, 5, 10, 3, 10, 6, 5]);
const search = ref("");
const headers = [
  {
    align: "start",
    key: "type",
    sortable: false,
    title: "Ответы",
  },
  { key: "type", title: "Тип" },
  { key: "question", title: "Вопрос" },
  { key: "answer", title: "Ответ" },
  { key: "userName", title: "Логин пользователя" },
  { key: "date", title: "Дата ответа" },
];

const questions = [
  {
    type: "Числовой",
    question: "Количество бутылок с питьевой водой.",
    answer: 4,
    userName: "user0",
    date: "8:15 27/05/2025",
  },
  {
    type: "Вопрос/ответ",
    question: "Документы проверены.",
    answer: true,
    userName: "user0",
    date: "8:15 27/05/2025",
  },
];
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
