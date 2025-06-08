import { preset as presetApi } from "~/api/answer-preset";

export const useAnswerPresetStore = defineStore("answer-preset", () => {
  const userStore = useUserStore();

  const accessToken = computed(() => userStore.accessToken);

  const preset: Ref<[]> = ref([]);

  const getAnswerPreset = async () => {
    preset.value = (await presetApi(accessToken.value)) || [];
  };

  const initPreset = computed(() =>
    preset.value.filter((el) => el?.onBeforeStart === true)
  );
  const endPreset = computed(() =>
    preset.value.filter((el) => el?.onBeforeStart === false)
  );

  return {
    preset,
    getAnswerPreset,
    initPreset,
    endPreset,
  };
});
