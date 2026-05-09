import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(apiKey);

export const generateQuiz = async (topic) => {
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API key is missing or invalid. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  // We enforce structured JSON output natively supported by Gemini 1.5/2.5 models
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: { type: SchemaType.STRING },
            options: { 
              type: SchemaType.ARRAY, 
              items: { type: SchemaType.STRING } 
            },
            correctAnswer: { type: SchemaType.STRING }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    }
  });

  const prompt = `Generate a 5-question multiple choice quiz about the topic: "${topic}". Make the questions engaging. Ensure all 4 options are distinct strings, and the correctAnswer matches exactly one of the options.`;
  
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating quiz from Gemini:", error);
    throw error;
  }
};
