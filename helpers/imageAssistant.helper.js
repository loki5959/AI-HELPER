require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

var ImageAssistantHelper = {
    route : '/image',

    getDescription : async function (imageUrl) {
        var prompt = `provide a description of the image : ${}`
    }
};