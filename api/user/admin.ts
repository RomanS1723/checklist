import { ENDPOINT } from "..";

export const getAll = async (accessToken: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${ENDPOINT}/admin/users`, requestOptions);
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const update = async (
  accessToken: string,
  id: number,
  data: { login: string; password: string; role: "user" | "admin" }
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const { login, password, role } = data;
  const raw = JSON.stringify({
    login,
    password,
    role,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/admin/user/${id}`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const remove = async (accessToken: string, id: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/admin/user/${id}`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
