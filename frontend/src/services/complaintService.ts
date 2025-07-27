import axios from "axios";

const API_URL = "http://localhost:5000/api/complaints";

/**
 * Submits a new complaint to the backend.
 * @param complaintData - A FormData object containing the complaint details.
 * @returns An object with success status and a message.
 */
export const submitComplaint = async (
  complaintData: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, complaintData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: response.data.message || "Complaint filed successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "An unexpected error occurred.",
    };
  }
};