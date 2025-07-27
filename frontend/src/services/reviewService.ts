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

export const fetchProductReviewCount = async (productId: string): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const reviews = response.data.reviews || response.data || [];
    return reviews.length;
  } catch (error: any) {
    console.error("Error fetching review count:", error?.response?.data?.message || error.message);
    return 0;
  }
};

export const fetchProductReviews = async (productId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reviews/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.reviews || response.data || [];
  } catch (error: any) {
    console.error(
      "Error fetching reviews:",
      error?.response?.data?.message || error.message
    );
    return [];
  }
};
