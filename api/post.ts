import { ENDPOINT } from ".";
import type { Answer } from "./answer-preset";

export const getMy = async (accessToken: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${ENDPOINT}/posts/my`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const onStart = async (
  accessToken: string,
  data: { title: string; description: string; questions: Answer[] }
) => {
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
    const response = await fetch(`${ENDPOINT}/posts/start`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const onEnd = async (
  accessToken: string,
  postId: number,
  endAnswers: Answer[]
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify(endAnswers);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${ENDPOINT}/posts/end/${postId}`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
