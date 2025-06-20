import { onEnd, onStart } from "~/api/post";
import { getAnswers as getAnswersAPI } from "~/api";

export const useQuestionStore = defineStore("question-store", () => {
  const localGetItem = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  };

  const localSetItem = (key: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  };

  const initQuestions = ref([]);
  const endQuestions = ref([]);
  const answers = ref([]);

  const presetStore = useAnswerPresetStore();
  const userStore = useUserStore();

  const accessToken = computed(() => userStore.accessToken);
  const initPreset = computed(() => presetStore.initPreset);
  const endPreset = computed(() => presetStore.endPreset);

  const postId: WritableComputedRef<number, number> = computed({
    get: () => {
      return Number.parseInt(localGetItem("postId") ?? "") ?? Number.NaN;
    },
    set: (value: number) => {
      localSetItem("postId", value.toString());
    },
  });

  const clearPostId = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("postId");
  };

  const generateInitQuestions = () => {
    const data = JSON.parse(JSON.stringify(initPreset.value)).map(
      (el, idx) => ({
        idx,
        type: el?.type,
        onBeforeStart: el?.onBeforeStart,
        fieldDescription: el?.fieldDescription,
        correct: el?.type === "correct" ? false : null,
        description: el?.type === "description" ? "" : null,
        count: el?.type === "count" ? 0 : null,
      })
    );
    initQuestions.value = data;
  };

  const generateEndQuestions = () => {
    const data = JSON.parse(JSON.stringify(endPreset.value)).map((el, idx) => ({
      idx,
      type: el?.type,
      onBeforeStart: el?.onBeforeStart,
      fieldDescription: el?.fieldDescription,
      correct: el?.type === "correct" ? false : null,
      description: el?.type === "description" ? "" : null,
      count: el?.type === "count" ? 0 : null,
    }));
    endQuestions.value = data;
  };

  const updateInitQuestion = (question: any) => {
    const findQuestion = initQuestions.value.findIndex(
      (el: any) => el?.idx === question?.idx
    );
    initQuestions.value[findQuestion] = question;
  };

  const updateEndQuestion = (question: any) => {
    const findQuestion = endQuestions.value.findIndex(
      (el: any) => el?.idx === question?.idx
    );
    endQuestions.value[findQuestion] = question;
  };

  const sendInit = async () => {
    const post = await onStart(accessToken.value, {
      title: "",
      description: "",
      questions: initQuestions.value,
    });
    postId.value = post?.id;
  };

  const sendEnd = async () => {
    await onEnd(accessToken.value, postId.value, endQuestions.value);
    clearPostId();
  };

  const getAnswers = async () => {
    answers.value = (await getAnswersAPI()) || [];
  };

  return {
    postId,
    initQuestions,
    endQuestions,
    clearPostId,
    generateInitQuestions,
    generateEndQuestions,
    updateInitQuestion,
    updateEndQuestion,
    sendInit,
    sendEnd,
    getAnswers,
    answers,
  };
});
