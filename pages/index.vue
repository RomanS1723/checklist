<template>
  <div>
    <div v-if="isMain" style="width: 100vw; height: 100vh">
      <v-container>
        <v-card title="Тестирование" subtitle="Входное">
          <form>
            <v-col>
              <v-checkbox label="Документы проверены." />
            </v-col>
            <v-col>
              <v-number-input
                :reverse="false"
                control-variant="split"
                label="Остаток воды в бутылях"
                :hide-input="false"
                inset
                variant="solo-filled"
              />
            </v-col>
            <v-col>
              <v-checkbox label="Заканчиваются конфеты." />
            </v-col>
            <v-col>
              <v-textarea label="Заметки, замечания" />
            </v-col>
          </form>
        </v-card>
      </v-container>
    </div>
    <questions-sheet-start v-if="isStarted" @accept="console.log('accept')" />
    <questions-sheet-complete v-if="isCompleted" @done="console.log('done')" />
  </div>
</template>

<script setup lang="ts">
const isStarted = ref(false);
const isMain = ref(false);
const isCompleted = ref(false);
</script>
