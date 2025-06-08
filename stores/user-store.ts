import { defineStore } from "pinia";
import { login as logInAPI } from "~/api/auth";

export const ACCESS_TOKEN_STR = "accessToken";
export const ROLE_STR = "role";

export const useUserStore = defineStore("user", () => {
  const localGetItem = (key: string): string | null => {
    console.log("localGetItem", key, typeof window === "undefined");
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  };

  const localSetItem = (key: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  };

  const accessToken: Ref<string> = ref(localGetItem(ACCESS_TOKEN_STR) || "");
  const role: Ref<"user" | "admin" | "ghost"> = ref(
    (localGetItem(ACCESS_TOKEN_STR) as "user" | "admin" | "ghost") || "ghost"
  );

  const isAuthorized: ComputedRef<boolean> = computed(
    () => !!accessToken.value
  );

  const init = () => {
    accessToken.value = localGetItem(ACCESS_TOKEN_STR) || "";
    role.value =
      (localGetItem(ROLE_STR) as "user" | "admin" | "ghost") || "ghost";
  };

  const logIn = async (login: string, password: string) => {
    const result = await logInAPI(login, password);
    if (!result.accessToken) {
      console.error("No access token:", result);
      return;
    }
    accessToken.value = result.accessToken;
    role.value = result.role;
    localSetItem(ACCESS_TOKEN_STR, result.accessToken);
    localSetItem(ROLE_STR, result.role);
    return result;
  };

  const logOut = () => {
    accessToken.value = "";
    role.value = "ghost";
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_STR);
    localStorage.removeItem(ROLE_STR);
  };

  return {
    accessToken,
    role,
    isAuthorized,
    logIn,
    logOut,
    init,
  };
});
