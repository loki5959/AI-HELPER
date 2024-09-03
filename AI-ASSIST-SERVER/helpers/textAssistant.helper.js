require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

var textAssistantHelper = {
  route: "/text",
  getSummary: async function (content) {
    var prompt = `Provide a concise summary of the following content, capturing the essential points and main ideas while omitting extraneous details. Present the summary in a clear and coherent manner, formatted as an HTML string suitable for display on a website. Use appropriate HTML tags like <p>, <strong>, and <em> to highlight key aspects and ensure readability.Provide the output as plain text without any additional formatting or code blocks. The content is ${content}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  },

  getAnswerMcq: async function (question) {
    var prompt = `Please provide a concise answer to the multiple choice question without any additional explanation. Please answer in a structured way to enhance readability The question is : ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },

  getAnswer: async function (question) {
    var prompt = `Provide a detailed and well-reasoned answer to the following question. Ensure that the response is clear, concise, and informative, covering all relevant aspects of the topic. Structure the output as an HTML string, using appropriate tags like <p>, <strong>, and <em> to enhance readability and presentation.Provide the output as plain text without any additional formatting or code blocks. The question is: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },

  generateQuestions: async function (content) {
    var prompt = `Generate a set of insightful and relevant questions based on the following content. Ensure the questions cover key points, provoke critical thinking, and explore the content deeply. Provide the output as an HTML string suitable for display on a website, using appropriate tags such as <ul>, <li>, and <strong> to format the questions clearly.Provide the output as plain text without any additional formatting or code blocks. The content is ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },

  extractKeywords: async function (content) {
    var prompt = `Extract the main keywords from the following content and return them as an HTML string formatted with appropriate HTML tags. Use <ul> and <li> for listing keywords, and consider using <span>, <strong>, or <em> for emphasis where needed. Ensure the output is well-structured for display on a website. Provide the output as plain text without any additional formatting or code blocks. The content is ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },
  paraphrase: async function (content) {
    var prompt = `Paraphrase the following content, ensuring that the meaning is preserved but the wording is significantly altered. Provide the output in a well-structured HTML string format suitable for display on a website. Use appropriate HTML tags like <p>, <strong>, <em>, and <br> where necessary to enhance readability and presentation. Ensure the final output is clear, concise, and easy to understand.Provide the output as plain text without any additional formatting or code blocks. The content is ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },
};

module.exports = textAssistantHelper;
