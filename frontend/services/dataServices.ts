import axios from "axios";

const baseUrl = "http://localhost:5000";

export async function fetchDownloadLinks(url: string) {
  try {
    const response = await axios.get(`${baseUrl}/api/links`, {
      params: {
        url,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getKeys(url: string, isDifferent: boolean, isMultiple: boolean) {
  try {
    const response = await axios.get(`${baseUrl}/api/keys`, {
      params: {
        url,
        isDifferent,
        isMultiple,
      },
    });
    console.log("Keys:", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
