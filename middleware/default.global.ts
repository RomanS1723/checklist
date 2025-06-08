import { useUserStore } from "~/stores/user-store";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  if (typeof window === "undefined") return;
  const userStore = useUserStore();
  userStore.init();
  const isAuthorized = computed(() => userStore.isAuthorized);
  const router = useRouter();
  if (!isAuthorized.value && to.path !== "/start") {
    router.push("/start");
    return;
  }
});
