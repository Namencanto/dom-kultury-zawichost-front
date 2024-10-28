import api from "~/server/db";
import { handleError } from "~/server/helpers";

export default defineEventHandler(async (event) => {
  try {
    console.log("Handling event for adding an event");

    const body = await readMultipartFormData(event);
    let bodySize = 0;

    for (const entry of body) {
      const [key, value] = entry;
      if (value instanceof File) {
        bodySize += value.size;
      } else {
        bodySize += new Blob([value]).size;
      }
      console.log(
        `Body entry - ${key}:`,
        value instanceof File
          ? `${value.name} (${(value.size / (1024 * 1024)).toFixed(2)} MB)`
          : value
      );
    }

    console.log(`Total body size: ${(bodySize / (1024 * 1024)).toFixed(2)} MB`);

    const cookies = parseCookies(event);
    const token = cookies.authToken;
    console.log("Token retrieved:", token ? "Token exists" : "No token found");

    if (!token) throw new Error("Token not found");

    const response = await api.post("/api/add-event", body, {
      headers: {
        token,
      },
    });

    console.log("API response status:", response.status);

    return response.data;
  } catch (error) {
    console.error("Error in event handler:", error);
    handleError(error);
  }
});
