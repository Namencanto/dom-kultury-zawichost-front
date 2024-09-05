import api from "~/server/db";
import { handleError } from "~/server/helpers";

export default defineEventHandler(async (event) => {
  try {
    const title = getRouterParam(event, "title");
    const publishDate = getRouterParam(event, "publishDate");

    if (!title || !publishDate) {
      throw new Error("Title and publishDate are required.");
    }
    const cookies = parseCookies(event);
    const token = cookies.authToken;

    const response = await api.delete(
      `/api/delete-event/${title}/${publishDate}`,
      {
        headers: {
          token,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
});
