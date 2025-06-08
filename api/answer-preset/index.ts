import { ENDPOINT } from "..";

export interface Answer {
  type: "count" | "correct" | "description";
  onBeforeStart: boolean;
  fieldDescription: string;
  count?: number;
  correct?: boolean;
  description?: string;
}

export const preset = async (accessToken: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${ENDPOINT}/answer-preset`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
