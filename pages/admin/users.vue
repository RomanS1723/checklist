<template>
  <v-container class="d-flex">
    <v-row>
      <v-col
        v-for="el in [0, 1, 2, 3, 4, 5, 6]"
        :key="el"
        cols="auto"
        justify="center"
      >
        <v-card class="pa-4 text-center mx-auto" width="300">
          <form>
            <v-text-field
              label="Логин"
              required
              variant="outlined"
              :rules="loginRules"
            />
            <password-input />
            <v-row>
              <v-col>
                <v-btn rounded="pill" color="success" @click="() => {}"
                  >Изменить</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const loginRules = ref([
  (value: string) => {
    if (value) return true;
    return "Обязательно для заполнения.";
  },
]);
</script>
