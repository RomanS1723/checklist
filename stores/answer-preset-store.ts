import { preset as presetApi } from "~/api/answer-preset";
import { add, update, del } from "~/api/answer-preset/admin";

export const useAnswerPresetStore = defineStore("answer-preset", () => {
  const userStore = useUserStore();

  const accessToken = computed(() => userStore.accessToken);

  const preset: Ref<[]> = ref([]);

  const getAnswerPreset = async () => {
    preset.value = (await presetApi(accessToken.value)) || [];
  };

  const initPreset = computed(() =>
    preset.value.filter(
      (el: { onBeforeStart: boolean }) => el?.onBeforeStart === true
    )
  );
  const endPreset = computed(() =>
    preset.value.filter(
      (el: { onBeforeStart: boolean }) => el?.onBeforeStart === false
    )
  );

  const adminAdd = async (data: {
    type: "count" | "correct" | "description";
    onBeforeStart: boolean;
    fieldDescription: string;
  }) => {
    await add(accessToken.value, data);
    await getAnswerPreset();
  };

  const adminUpdate = async (
    id: number,
    data: {
      type: "count" | "correct" | "description";
      onBeforeStart: boolean;
      fieldDescription: string;
    }
  ) => {
    await update(accessToken.value, id, data);
    await getAnswerPreset();
  };

  const adminRemove = async (id: number) => {
    await del(accessToken.value, id);
    await getAnswerPreset();
  };

  return {
    preset,
    getAnswerPreset,
    initPreset,
    endPreset,
    adminAdd,
    adminUpdate,
    adminRemove,
  };
});
