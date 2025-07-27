import axios from "axios";

// The base URL for your chat-related API endpoints
const API_URL = "https://freshconnect-kuwy.onrender.com/api/chat";

// --- Reusable Type Definitions ---
// These types should match the data structures sent by your backend.

// A simplified User type for chat participants
export interface User {
  _id: string;
  name: string;
  // You can add other properties like 'avatar' if available
}

// A single chat message
export interface Message {
  _id: string;
  conversationId: string;
  sender: User;
  content: string;
  createdAt: string;
}

// A conversation, which is a collection of messages between participants
export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: Message; // Optional: The most recent message for previews
  updatedAt: string;
}

// --- API Functions ---

/**
 * Creates a reusable config object with the authorization token.
 * It's good practice to keep this logic in one place.
 * @returns An Axios request config object with the Authorization header.
 */
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

/**
 * Gets or creates a one-on-one conversation with a specific recipient.
 * If a conversation already exists, it returns the existing one.
 * If not, it creates a new one.
 * @param recipientId - The user ID of the person you want to chat with.
 * @returns A promise that resolves to the Conversation object.
 */
export const accessOrCreateConversation = async (
  recipientId: string
): Promise<Conversation> => {
  try {
    const response = await axios.post(
      API_URL,
      { recipientId },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error accessing or creating conversation:", error);
    throw error; // Re-throw the error to be handled by the calling component
  }
};

/**
 * Fetches all conversations for the currently logged-in user.
 * This is used to populate the conversation list in the chat page.
 * @returns A promise that resolves to an array of Conversation objects.
 */
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await axios.get(API_URL, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

/**
 * Fetches the entire message history for a specific conversation.
 * @param conversationId - The ID of the conversation to get messages for.
 * @returns A promise that resolves to an array of Message objects.
 */
export const getMessages = async (
  conversationId: string
): Promise<Message[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/${conversationId}/messages`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching messages for conversation ${conversationId}:`,
      error
    );
    throw error;
  }
};