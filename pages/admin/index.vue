<template>
    <v-container>
      <v-row>
        <template v-if="false">
          <v-col
            v-for="(_, idx) in [0, 1, 2, 3]"
            :key="idx"
            cols="12"
            justify="center"
          >
            <v-skeleton-loader class="mx-1 my-1 border" type="article" />
          </v-col>
        </template>
        <template v-else>
            <v-col
            v-for="(entity, idx) in [{ name: 'Наименование', vendor: 'Вопрос/ответ', days_before_warning: 10, description: 'Описание вопроса', id: 0 }]"
            :key="idx"
            cols="12"
            justify="center"
          >
            <v-card variant="flat">
              <v-card-item>
                <div>
                  <div class="text-h6 mb-1">{{ entity?.name }}</div>
                  <div class="text-overline mb-1">
                    Тип: {{ entity?.vendor }}
                  </div>
                  <div v-if="entity?.description" class="text-caption">
                    Описание: {{ entity?.description }}
                  </div>
                </div>
              </v-card-item>
              <v-card-actions>
                <dialog-answer-preset-remove :id="entity?.id" />
                <dialog-answer-preset-update :id="entity?.id" />
              </v-card-actions>
            </v-card>
          </v-col>
          <div class="text-center mx-auto mb-1">
            <dialog-answer-preset-add />
          </div>
        </template>
      </v-row>
    </v-container>
  </template>