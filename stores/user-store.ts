import { defineStore } from "pinia";
import { login as logInAPI } from "~/api/auth";
import { register } from "~/api/auth/admin";
import { getAll, remove, update } from "~/api/user/admin";

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

  const users = ref([]);

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

  const adminGetAll = async () => {
    users.value = await getAll(accessToken.value);
  };

  const adminRegister = async (user: {
    login: string;
    password: string;
    role: "user" | "admin";
  }) => {
    const result = await register(accessToken.value, user);
    await adminGetAll();
    return result;
  };

  const adminUpdate = async (
    id: number,
    user: { login: string; password: string; role: "user" | "admin" }
  ) => {
    const result = await update(accessToken.value, id, user);
    await adminGetAll();
    return result;
  };

  const adminRemove = async (id: number) => {
    await remove(accessToken.value, id);
    await adminGetAll();
  };

  return {
    accessToken,
    role,
    isAuthorized,
    logIn,
    logOut,
    init,
    users,
    adminGetAll,
    adminRegister,
    adminUpdate,
    adminRemove,
  };
});
