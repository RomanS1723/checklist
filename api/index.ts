//export const ENDPOINT = "http://localhost:80";
export const ENDPOINT = "https://checklist-api-9tv5.onrender.com";

export const getAnswers = async (): Promise<[] | undefined> => {
  try {
    return (await (
      await fetch(`${ENDPOINT}/answers`, { method: "GET" })
    ).json()) as [];
  } catch (error) {
    console.error(error);
  }
};
