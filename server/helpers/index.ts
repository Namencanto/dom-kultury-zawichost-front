export function handleError(error: Error) {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    throw new Error({
      statusCode: error.response.status || 500,
      message:
        error.response.data.message ||
        "An error occurred while processing the request.",
    });
  } else if (error.request) {
    console.error("No response from external API:", error.request);
    throw new Error({
      statusCode: 502,
      message:
        "Failed to communicate with the external API. Please try again later.",
    });
  } else {
    console.error("Unexpected Error:", error.message);
    throw new Error({
      statusCode: 500,
      message: error.message || "An unexpected error occurred.",
    });
  }
}
