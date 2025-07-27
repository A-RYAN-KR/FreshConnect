const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios"); // Import axios
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function remains the same, but it will now receive a valid buffer
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

/**
 * Verifies if an image at a given URL contains a rotten product.
 * @param {string} imageUrl - The public URL of the image to verify.
 * @returns {Promise<boolean>} - True if the AI confirms the product is rotten.
 */
async function verifyRottenImage(imageUrl) {
  try {
    // Step 1: Download the image from the URL into a buffer
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;
    const mimeType = response.headers["content-type"];

    // Step 2: Proceed with the Gemini API call as before, but with the downloaded data
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt =
      "Analyze the attached image. Does this image clearly show a rotten or spoiled fruit or vegetable? Answer with only 'yes' or 'no'.";

    const imagePart = fileToGenerativePart(imageBuffer, mimeType);

    const result = await model.generateContent([prompt, imagePart]);
    const genAIResponse = await result.response;
    const text = genAIResponse.text().trim().toLowerCase();

    console.log("Gemini Response:", text);

    return text === "yes";
  } catch (error) {
    console.error("Error calling Gemini API or fetching image:", error);
    return false; // Default to false on any error
  }
}

module.exports = { verifyRottenImage };