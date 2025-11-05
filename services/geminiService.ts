import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Message, FunctionCall } from '../types';
import { menuItems } from '../data/menuData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const videoSchema = {
  type: Type.OBJECT,
  properties: {
    videoUrl: {
      type: Type.STRING,
      description: "A valid YouTube embed URL for a real recipe or cooking tutorial video. For example: https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    responseText: {
      type: Type.STRING,
      description: "A friendly text response to accompany the video link.",
    },
  },
  required: ["responseText", "videoUrl"],
};

const addToOrderFunctionDeclaration: FunctionDeclaration = {
  name: 'addToOrder',
  description: 'Adds one or more items from the menu to the user\'s current order.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      items: {
        type: Type.ARRAY,
        description: 'A list of items to add to the order.',
        items: {
          type: Type.OBJECT,
          properties: {
            itemName: {
              type: Type.STRING,
              description: 'The exact name of the menu item to add, for example "Solomillo de Ternera" or "Tarta de Queso Vasca". Must match an item from the menu.',
            },
            quantity: {
              type: Type.NUMBER,
              description: 'The number of this item to add to the order. Defaults to 1 if not specified.',
            },
          },
          required: ['itemName'],
        },
      },
    },
    required: ['items'],
  },
};

const menuString = menuItems.map(item =>
  `- ${item.name} (${item.price.toFixed(2)}€): ${item.description}`
).join('\n');

const systemInstruction = `You are SaborBot, a futuristic, highly advanced, friendly, and knowledgeable AI assistant for a high-end restaurant. You act as a virtual waiter and an expert on the menu.

**CRITICAL KNOWLEDGE: THIS IS THE ONLY MENU YOU KNOW. ALL YOUR ANSWERS ABOUT FOOD, NUTRITION, AND PAIRINGS MUST BE BASED SOLELY ON THE ITEMS LISTED BELOW.**

<MENU>
${menuString}
</MENU>

**YOUR CORE RESPONSIBILITIES:**
1.  **Expert Waiter**: Assist users with the menu, provide detailed information about the dishes above, suggest pairings (maridajes), give nutritional estimates, and recommend a "plato del día" (dish of the day) if asked.
2.  **Order Taker**: When a user wants to order food (e.g., "quiero un solomillo", "añade una tarta de queso"), you MUST use the 'addToOrder' function. You can add multiple items in a single function call. After using the function, do not respond with text; the system will confirm the order.
3.  **Video Provider**: If the user asks for a recipe, video, tutorial, or 'paso a paso' related to food, find a relevant, REAL cooking video from a platform like YouTube and provide it using the provided schema.
4.  **General Assistant**: Answer a wide range of general knowledge questions on any topic.

**PERSONALITY:**
- Your name is SaborBot.
- Your responses must be in Spanish.
- Maintain a helpful, engaging, and slightly futuristic personality.
`;

export const getBotResponse = async (userMessage: string, chatHistory: Message[]): Promise<{ text: string; videoUrl?: string; functionCall?: FunctionCall }> => {
  const videoKeywords = ['video', 'receta', 'paso a paso', 'tutorial', 'muéstrame', 'enséñame'];
  const isVideoRequest = videoKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));

  try {
    if (isVideoRequest) {
      if (userMessage.toLowerCase().includes('tarta de queso')) {
        return {
            text: "¡Claro! Aquí tienes un video excelente para preparar la Tarta de Queso Vasca.",
            videoUrl: "https://www.youtube.com/embed/ElazfQOGK6I"
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `User asks: "${userMessage}". Find a relevant, real cooking video and provide a response.`,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: videoSchema
        }
      });

      const jsonText = response.text.trim();
      const parsed = JSON.parse(jsonText);
      return { text: parsed.responseText, videoUrl: parsed.videoUrl };

    } else {
      const fullHistory = [
        ...chatHistory
          .filter(m => !m.isThinking && m.text && m.text.trim() !== '')
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];
    
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullHistory,
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: [addToOrderFunctionDeclaration] }],
        }
      });
    
      const functionCalls = response.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        const fc = functionCalls[0];
        if (fc.name && fc.args) {
          return { text: '', functionCall: { name: fc.name, args: fc.args } };
        }
      }

      return { text: response.text };
    }
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
    return { text: "Lo siento, tuve un problema para procesar tu solicitud. Por favor, inténtalo de nuevo." };
  }
};

export const getRecipeSummary = async (videoQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the user's request for a video about "${videoQuery}", generate a detailed recipe. The recipe should include a list of ingredients and a step-by-step guide for preparation. Format the response in Spanish using Markdown for clarity (e.g., use headings for 'Ingredientes' and 'Instrucciones', and lists for the items).`,
        config: {
            systemInstruction: 'You are a master chef expert in creating clear and concise recipes.',
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching recipe summary from Gemini:", error);
    return "No pude generar la receta en este momento. Por favor, intenta de nuevo más tarde.";
  }
};