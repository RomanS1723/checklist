<template>
  <v-col>
    <v-checkbox
      v-if="entity?.type === 'correct'"
      v-model="answer.correct"
      :label="entity?.fieldDescription"
    />
    <v-number-input
      v-if="entity?.type === 'count'"
      v-model="answer.count"
      :reverse="false"
      control-variant="split"
      :label="entity?.fieldDescription"
      :hide-input="false"
      inset
      variant="solo-filled"
    />
    <v-textarea
      v-if="entity?.type === 'description'"
      v-model="answer.description"
      :label="entity?.fieldDescription"
    />
  </v-col>
</template>

<script setup lang="ts">
const props = defineProps(["entity"]);

const questionStore = useQuestionStore();

const answer = ref({
  correct: props.entity?.type === "correct" ? false : null,
  description: props.entity?.type === "description" ? "" : null,
  count: props.entity?.type === "count" ? 0 : null,
});

watch(
  answer,
  () => {
    console.log(answer.value);
    if (props.entity?.onBeforeStart) {
      questionStore.updateInitQuestion({
        idx: props.entity?.idx,
        type: props.entity?.type,
        onBeforeStart: props.entity?.onBeforeStart,
        fieldDescription: props.entity?.fieldDescription,
        correct: answer.value.correct,
        description: answer.value.description,
        count: answer.value.count,
      });
    } else {
      questionStore.updateEndQuestion({
        idx: props.entity?.idx,
        type: props.entity?.type,
        onBeforeStart: props.entity?.onBeforeStart,
        fieldDescription: props.entity?.fieldDescription,
        correct: answer.value.correct,
        description: answer.value.description,
        count: answer.value.count,
      });
    }
  },
  { deep: true }
);
</script>
