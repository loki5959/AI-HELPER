// GeminiAPI Class
class GeminiAPI {
  constructor(
    API_KEY = "AIzaSyD0CFRKO0_vGvUmhmN230RNfPtErRDDFi0",
    MODEL_ID = "gemini-1.5-flash",
    systemInstruction = "You are a helpful assistant."
  ) {
    this.apiKey = API_KEY;
    this.modelId = MODEL_ID;
    this.systemInstruction = systemInstruction;
  }

  async getGeminiResponses(content) {
    try {
      const response = await fetch("https://api.genai.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelId,
          prompt: this.systemInstruction + "\n" + content,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      return `Error generating response: ${error.message}`;
    }
  }
}

// TextAssistant Class
class TextAssistant {
  constructor() {
    this.ACTIONS = [
      "summarize",
      "answerMcq",
      "dictionary",
      "translateText",
      "analyzeSentiment",
      "summarizeWithOptions",
      "generateQuestions",
      "compareTexts",
      "extractKeywords",
      "paraphraseText",
      "explainConcept",
      "spellAndGrammarCheck",
      "expandText",
      "moderateContent",
      "textToSpeech",
      "speechToText",
    ];

    this.api = new GeminiAPI();
  }

  async response(content, action = "summarize") {
    if (!this.ACTIONS.includes(action)) {
      return "Invalid action specified.";
    }

    const instruction = this[action](content);
    return await this.api.getGeminiResponses(instruction);
  }

  summarize(content) {
    return `Summarize the following content:\n\n${content}`;
  }

  answerMcq(content) {
    return `Answer the following multiple-choice questions based on the content:\n\n${content}`;
  }

  dictionary(content) {
    return `Provide the dictionary definition for the term:\n\n${content}`;
  }

  translateText(content) {
    return `Translate the following content from source_language to target_language:\n\n${content}`;
  }

  analyzeSentiment(content) {
    return `Analyze the sentiment of the following content:\n\n${content}`;
  }

  summarizeWithOptions(content, style = "concise") {
    return `Summarize the following content in a ${style} style:\n\n${content}`;
  }

  generateQuestions(content) {
    return `Generate questions based on the following content:\n\n${content}`;
  }

  compareTexts(content) {
    return `Compare the following two texts and highlight their differences:\n\n${content}`;
  }

  extractKeywords(content) {
    return `Extract the main keywords from the following content:\n\n${content}`;
  }

  paraphraseText(content) {
    return `Paraphrase the following content:\n\n${content}`;
  }

  explainConcept(content) {
    return `Explain the following concept in simple terms:\n\n${content}`;
  }

  spellAndGrammarCheck(content) {
    return `Check and correct the spelling and grammar in the following content:\n\n${content}`;
  }

  expandText(content) {
    return `Expand the following idea into a more detailed passage:\n\n${content}`;
  }

  moderateContent(content) {
    return `Moderate the following content for any inappropriate language or topics:\n\n${content}`;
  }

  textToSpeech(content) {
    return `Convert the following content into speech:\n\n${content}`;
  }

  speechToText(content) {
    return `Convert the following speech into text:\n\n${content}`;
  }
}

// ImageAssistant Class
class ImageAssistant {
  constructor() {
    this.ACTIONS = ["imageCaption", "generateVisuals"];
    this.api = new GeminiAPI();
  }

  async response(content, action = "imageCaption") {
    if (!this.ACTIONS.includes(action)) {
      return "Invalid action specified.";
    }

    const instruction = this[action](content);
    return await this.api.getGeminiResponses(instruction);
  }

  imageCaption(content) {
    return `Generate a caption for the following image description:\n\n${content}`;
  }

  generateVisuals(content) {
    return `Create a chart or graph based on the following data:\n\n${content}`;
  }
}

// CodeAssistant Class
class CodeAssistant {
  constructor() {
    this.ACTIONS = ["generateCode", "correctOrCompleteTheCode"];
    this.api = new GeminiAPI();
  }

  async response(content, action = "generateCode") {
    if (!this.ACTIONS.includes(action)) {
      return "Invalid action specified.";
    }

    const instruction = this[action](content);
    return await this.api.getGeminiResponses(instruction);
  }

  generateCode(content) {
    return `Generate code to accomplish the following task:\n\n${content}`;
  }

  correctOrCompleteTheCode(content) {
    return `Correct or complete the following code:\n\n${content}`;
  }
}
class ExtensionAssistant {
  constructor() {
    this.textAssistant = new TextAssistant();
    this.imageAssistant = new ImageAssistant();
    this.codeAssistant = new CodeAssistant();
  }

  async handleRequest(content, domain = "text", action = "summarize") {
    if (domain === "text") {
      return await this.textAssistant.response(content, action);
    } else if (domain === "image") {
      return await this.imageAssistant.response(content, action);
    } else if (domain === "code") {
      return await this.codeAssistant.response(content, action);
    } else {
      return "Invalid domain specified.";
    }
  }
}
