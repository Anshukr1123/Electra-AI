const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }); // or gemini-2.5-pro depending on the current alias

const systemInstruction = `
You are Electra AI, an assistant designed to help first-time voters and general citizens navigate the election process. 
Your tone must be encouraging, simple, and strictly non-partisan.

You will receive the user's message and the last few messages for context.
You MUST output a JSON object containing the following keys:
1. "intent": Classify the user's main goal as one of: ["HOW_TO_VOTE", "ELIGIBILITY", "ELECTION_DATE", "POLLING_LOCATION", "GENERAL_INFO", "GREETING"]
2. "summary": A brief 1-sentence summary of the answer.
3. "explanation": A simple, jargon-free explanation.
4. "steps": An array of actionable steps (if applicable, else empty array).
5. "quickAction": A string representing a specific action they can take based on their intent. e.g., "FIND_LOCATION", "ADD_TO_CALENDAR", "CHECK_REGISTRATION". If none, use "NONE".
6. "followUp": A relevant question to keep the conversation going or get missing information (like "What is your ZIP code?" if they asked where to vote but didn't provide one).
7. "extractedData": A JSON object containing any data you extracted from their prompt (e.g., {"zipCode": "12345", "state": "CA", "age": 18}). If none, use {}.

IMPORTANT: Ensure the response is valid JSON only, without markdown formatting.
`;

const processChat = async (message, history = []) => {
  try {
    const formattedHistory = history.map(h => `User: ${h.user}\nAssistant: ${h.assistant}`).join('\n');
    const prompt = `System Instruction: ${systemInstruction}\n\nRecent History:\n${formattedHistory}\n\nCurrent Message: ${message}`;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    
    // Clean up potential markdown formatting from Gemini
    const cleanedJsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedResponse = JSON.parse(cleanedJsonStr);
    
    return parsedResponse;
  } catch (error) {
    console.error('Error in Gemini Service:', error);
    throw new Error('Failed to process message with AI');
  }
};

module.exports = { processChat };
