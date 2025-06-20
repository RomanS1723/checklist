<template>
  <v-container class="d-flex">
    <v-row>
      <user-card v-for="user in users" :key="user?.id" :user="user" />
      <v-col cols="auto" justify="center">
        <v-card class="pa-4 text-center mx-auto" width="300">
          <form>
            <dialog-user-add />
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const users = computed(() => userStore.users);

onMounted(async () => {
  await userStore.adminGetAll();
});
</script>
