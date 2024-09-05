import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const token = getCookie(event, "authToken");

    if (!token) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        message: "No token provided",
      };
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
      const isAdmin = decoded.role === "ADMIN";
      return { isAuthenticated: true, isAdmin };
    } else {
      return { isAuthenticated: true, isAdmin: false };
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    return {
      isAuthenticated: false,
      isAdmin: false,
      message: "Invalid or expired token",
    };
  }
});
