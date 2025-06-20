<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ props: activatorProps }">
      <v-btn
        rounded="pill"
        color="success"
        :loading="loading"
        v-bind="activatorProps"
        :disabled="disabled"
      >
        Изменить
      </v-btn>
    </template>
    <v-card
      prepend-icon="mdi-circle-multiple"
      title="Обновить вопрос"
      text="Вы не сможете восстановить старые данные после обновления, хотите продолжить?"
    >
      <template #actions>
        <v-spacer />
        <v-btn color="blue-lighten-1" @click="dialog = false"> Отмена </v-btn>
        <v-btn color="primary" variant="flat" @click="approve">
          Обновить
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const props = defineProps<{
  entity: object;
  disabled: boolean;
}>();

const dialog = ref(false);
const loading = ref(false);

const approve = async () => {
  if (
    props.entity.id === Number.NaN ||
    props.entity.login === "" ||
    props.entity.password === "" ||
    props.entity.role === ""
  ) {
    return;
  }
  // approve logic here
  const pr = await userStore.adminUpdate(props.entity?.id, props.entity);
  console.log(pr);
  dialog.value = false;
};
</script>
