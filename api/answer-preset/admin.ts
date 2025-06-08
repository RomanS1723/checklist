import type { Answer } from ".";
import { ENDPOINT } from "..";

export const add = async (accessToken: string, data: Answer) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/answer-preset/admin`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const update = async (accessToken: string, id: number, data: Answer) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/answer-preset/admin/${id}`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const del = async (accessToken: string, id: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/answer-preset/admin/${id}`,
      requestOptions
    );
    const result = await response.json();
    console.log(`deleted/${id}/${result}`);
  } catch (error) {
    console.error(error);
  }
};
