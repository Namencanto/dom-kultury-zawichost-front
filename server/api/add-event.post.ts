import api from "~/server/db";
import { handleError } from "~/server/helpers";

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);

    const cookies = parseCookies(event);
    const token = cookies.authToken;

    if (!token) throw new Error("token");
    const response = await api.post("/api/add-event", body, {
      headers: {
        token,
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
});
