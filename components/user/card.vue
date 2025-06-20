<template>
  <v-col cols="auto" justify="center">
    <v-card class="pa-4 text-center mx-auto" width="300">
      <form>
        <v-text-field
          v-model="regs.login"
          label="Логин"
          required
          variant="outlined"
          :rules="loginRules"
        />
        <password-input v-model="regs.password" label="Новый пароль" />
        <v-select
          v-model="select"
          :items="Object.values(rolesTranscription)"
          :rules="[(v) => !!v || 'Необходимо выбрать роль']"
          label="Роль"
          required
        />
        <v-row>
          <v-col>
            <dialog-user-remove :id="user?.id" />
          </v-col>
          <v-col>
            <dialog-user-update
              :entity="changedUser"
              :disabled="!(regs.password.length >= 6)"
            />
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import type PasswordInput from "../password-input.vue";

const props = defineProps(["user"]);
const rolesTranscription = ref({
  admin: "Администратор",
  user: "Пользователь",
});
const select = ref(rolesTranscription.value[props.user?.role] || null);

const regs = ref({
  login: props.user?.login,
  password: "",
});

const loginRules = ref([
  (value: string) => {
    if (value) return true;
    return "Обязательно для заполнения.";
  },
]);

const changedUser = computed(() => ({
  id: props.user?.id,
  login: regs.value.login,
  password: regs.value.password,
  role: Object.keys(rolesTranscription.value).find(
    (k) => rolesTranscription.value[k] === select.value
  ),
}));

// const userStore = useUserStore();
// const users = computed(() => userStore.users);
</script>
