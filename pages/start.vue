<template>
  <v-app>
    <v-main>
      <v-container class="d-flex">
        <v-card class="pa-4 text-center mx-auto" width="300">
          <form v-if="active === START">
            <v-col>
              <v-btn
                rounded="pill"
                color="primary"
                @click="() => (active = LOGIN)"
                >Log in</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                rounded="pill"
                color="primary"
                @click="() => (active = REGISTER)"
                >Register</v-btn
              >
            </v-col>
          </form>
          <form v-else-if="active === LOGIN">
            <v-card-title> Вход </v-card-title>
            <v-text-field
              v-model="logInData.email"
              label="Логин"
              required
              variant="outlined"
              :rules="emailRules"
            />
            <v-text-field
              v-model="logInData.password"
              v-bind="$attrs"
              label="Пароль"
              required
              variant="outlined"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              @click:append-inner="showPassword = !showPassword"
            />
            <v-row>
              <v-col>
                <!-- <v-btn
                    rounded="pill"
                    color="primary"
                    variant="outlined"
                    @click="goBack"
                    >Go back</v-btn
                  > -->
              </v-col>
              <v-col>
                <v-btn rounded="pill" color="success" @click="logIn"
                  >Log in</v-btn
                >
              </v-col>
            </v-row>
          </form>
          <form v-else-if="active === REGISTER">
            <v-card-title> Register </v-card-title>
            <v-text-field
              v-model="registerData.name"
              label="name"
              required
              variant="outlined"
              :rules="nameRules"
            />
            <v-text-field
              v-model="registerData.surname"
              label="surname"
              required
              variant="outlined"
              :rules="nameRules"
            />
            <v-text-field
              v-model="registerData.email"
              label="email"
              required
              variant="outlined"
              :rules="emailRules"
            />
            <v-text-field
              v-model="registerData.password"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              label="password"
              required
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
            />
            <v-row>
              <v-col>
                <v-btn
                  rounded="pill"
                  color="primary"
                  primary
                  variant="outlined"
                  @click="goBack"
                  >Go back</v-btn
                >
              </v-col>
              <v-col>
                <v-btn rounded="pill" color="success" @click="register"
                  >register</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-card>
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-alert"
            text="Check the correctness of the filled-in data."
            title="Verification"
          >
            <template #actions>
              <v-btn class="ms-auto" text="Ok" @click="dialog = false" />
            </template>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "",
});

const START = "start";
const LOGIN = "login";
const REGISTER = "register";

const router = useRouter();

const active = ref(LOGIN);
const dialog = ref(false);
const showPassword = ref(false);
const nameRules = ref([
  (value: string) => {
    if (value) return true;

    return "Is required.";
  },
]);
const emailRules = ref([
  (value: string) => {
    if (value) return true;

    return "Обязательно для заполнения.";
  },
  (value: string) => {
    return true;
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);
const passwordRules = ref([
  (value: string) => {
    if (value) return true;

    return "Обязательно для заполнения.";
  },
  (value: string) => {
    if (value.length > 6) return true;

    return "Minimum of 6 characters.";
  },
]);
const registerData = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
});
const logInData = ref({
  email: "",
  password: "",
});

const goBack = () => {
  active.value = START;
  showPassword.value = false;
  registerData.value = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  logInData.value = {
    email: "",
    password: "",
  };
};

watch(dialog, (value: boolean) => {
  if (value) {
    showPassword.value = false;
    registerData.value = {
      name: "",
      surname: "",
      email: "",
      password: "",
    };
    logInData.value = {
      email: "",
      password: "",
    };
  }
});

const register = async () => {
  if (Object.values(registerData.value).filter((e) => e === "").length) return;
  // register logic
};

const logIn = async () => {
  try {
    if (Object.values(logInData.value).filter((e) => e === "").length) return;
    // log in logic
    router.push("/");
    //
    dialog.value = true;
  } catch {
    dialog.value = true;
  }
};
</script>
