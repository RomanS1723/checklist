<template>
  <div>
    <div v-if="activeTab === MAIN" style="width: 100vw; height: 100vh">
      <v-container>
        <v-card title="Тестирование" subtitle="Входное">
          <form>
            <template v-if="initPreset">
              <questions-answer
                v-for="(el, idx) in initPreset"
                :key="idx"
                :entity="el"
              />
            </template>
            <v-divider />
            <div class="text-end pa-4 mx-auto">
              <v-btn
                class="text-none"
                color="success"
                variant="flat"
                width="110"
                rounded
                @click="sendInitQuestions"
              >
                Отправить
              </v-btn>
            </div>
          </form>
        </v-card>
      </v-container>
    </div>
    <div v-if="activeTab === END" style="width: 100vw; height: 100vh">
      <v-container>
        <v-card title="Тестирование" subtitle="Завершающее">
          <form>
            <template v-if="endPreset">
              <questions-answer
                v-for="(el, idx) in endPreset"
                :key="idx"
                :entity="el"
              />
            </template>
            <v-divider />
            <div class="text-end pa-4 mx-auto">
              <v-btn
                class="text-none"
                color="success"
                variant="flat"
                width="110"
                rounded
                @click="sendEndQuestions"
              >
                Отправить
              </v-btn>
            </div>
          </form>
        </v-card>
      </v-container>
    </div>
    <questions-sheet-start v-if="activeTab === START" @accept="start" />
    <questions-sheet-complete
      v-if="activeTab === COMPLETED"
      @done="activeTab = START"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const START = "start";
const MAIN = "main";
const END = "end";
const COMPLETED = "completed";
const activeTab = ref(START);

const presetStore = useAnswerPresetStore();
const questionStore = useQuestionStore();
const initPreset = computed(() => questionStore.initQuestions);
const endPreset = computed(() => questionStore.endQuestions);

onMounted(async () => {
  setPageLayout("default");
  await presetStore.getAnswerPreset();
  questionStore.generateInitQuestions();
  questionStore.generateEndQuestions();
});

const start = () => {
  activeTab.value = MAIN;
};

const sendInitQuestions = async () => {
  await questionStore.sendInit();
  activeTab.value = END;
};

const sendEndQuestions = async () => {
  await questionStore.sendEnd();
  window.location.reload();
};
</script>
