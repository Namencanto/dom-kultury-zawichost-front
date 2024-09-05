import api from "~/server/db";
import { handleError } from "~/server/helpers";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Make the API request
    const response = await api.post("/auth/admin-login", body);

    // Check if the set-cookie header is present
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader && setCookieHeader.length > 0) {
      const cookie = setCookieHeader[0];
      const cookieParts = cookie.split(";")[0];

      const [cookieName, cookieValue] = cookieParts.split("=");

      setCookie(event, cookieName, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });
    }

    return response.data;
  } catch (error) {
    handleError(error);
  }
});
