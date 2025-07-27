import axios from "axios";

// Assuming your suppliers are fetched from the users endpoint
const API_URL = "http://localhost:5000/api/reviews";

/**
 * Submits a new review to the backend.
 * @param productId - The ID of the product being reviewed.
 * @param reviewData - A FormData object containing the review details (rating, comment, reviewImages).
 * @returns An object with success status and a message.
 */
export const submitReview = async (
  productId: string,
  reviewData: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(
      `${API_URL}/${productId}`,
      reviewData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Axios automatically parses the JSON and returns it in `response.data`
    const result = response.data;

    return {
      success: true,
      message: result.message || "Review submitted successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Server responded with an error.",
    };
  }
};
