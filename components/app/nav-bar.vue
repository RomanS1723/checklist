<template>
  <v-navigation-drawer
    v-if="role === 'admin'"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item nav>
      <template #append>
        <v-btn
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          @click.stop="rail = !rail"
        />
      </template>
    </v-list-item>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-file-question"
        title="Вопросы"
        value="software"
        @click="() => router.push('/admin')"
      />
      <v-list-item
        prepend-icon="mdi-chart-box"
        title="Статистика"
        value="software"
        @click="() => router.push('/admin/statistics')"
      />
      <v-list-item
        prepend-icon="mdi-account-supervisor"
        title="Пользователи"
        value="software"
        @click="() => router.push('/admin/users')"
      />
    </v-list>

    <v-divider />

    <!-- <v-list>
        <v-list-item
          prepend-icon="mdi-earth"
          :title="'Language: ' + currentLang"
          slim
          @click="changeLang"
        >
        </v-list-item>
      </v-list> -->

    <v-dialog v-model="isExcelModalOpen" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Uploading an Excel file</span>
          <v-btn icon="mdi-close" variant="text" @click="closeModal" />
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-file-input
              v-model="selectedFile"
              accept=".xlsx,.xls"
              label="Select an Excel file"
              :disabled="isLoading"
              :error-messages="error"
              @change="onFileChange"
            />

            <v-btn
              type="submit"
              color="primary"
              :disabled="isLoading || !selectedFile"
              :loading="isLoading"
              block
              class="mt-4"
            >
              Upload
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const role = computed(() => userStore.role);

const drawer = ref(true);
const rail = ref(false);
const currentLang = ref("en");
const isExcelModalOpen = ref(false);
const selectedFile = ref<File | null>(null);
const isLoading = ref(false);
const isSyncing = ref(false);
const error = ref("");

const router = useRouter();

const sync = async () => {
  isSyncing.value = true;

  //sync logic
};

const changeLang = () => {};

const closeModal = () => {
  isExcelModalOpen.value = false;
  selectedFile.value = null;
  error.value = "";
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
  } else {
    selectedFile.value = null;
  }
};

const handleSubmit = async () => {
  if (!selectedFile.value) {
    error.value = "Please select the file";
    return;
  }

  isLoading.value = true;
  error.value = "";

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  isLoading.value = false;
};
</script>
