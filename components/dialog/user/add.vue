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
    <v-card
      prepend-icon="mdi-plus-circle-multiple"
      title="Добавить пользователя"
      min-width="300"
    >
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              v-model="regs.login"
              label="Логин*"
              required
              variant="outlined"
              :rules="loginRules"
            />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <password-input v-model="regs.password" label="Новый пароль*" />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="select"
              :items="Object.values(rolesTranscription)"
              :rules="[(v) => !!v || 'Необходимо выбрать роль']"
              label="Роль*"
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
        <v-btn text="Close" variant="plain" @click="dialog = false" />
        <v-btn color="success" text="Add" variant="tonal" @click="approve" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const regs = ref({
  login: "",
  password: "",
});
const rolesTranscription = ref({
  admin: "Администратор",
  user: "Пользователь",
});
const select = ref(null);
const loginRules = ref([
  (value: string) => {
    if (value) return true;
    return "Обязательно для заполнения.";
  },
]);

const dialog = ref(false);
const loading = ref(false);

const approve = async () => {
  if (
    regs.value.login === "" ||
    regs.value.password === "" ||
    select.value === ""
  ) {
    return;
  }
  // approve logic
  const result = {
    login: regs.value.login,
    password: regs.value.password,
    role: Object.keys(rolesTranscription.value).find(
      (k) => rolesTranscription.value[k] === select.value
    ),
  };
  const pr = await userStore.adminRegister(result);
  console.log(pr);
  dialog.value = false;
};
</script>
