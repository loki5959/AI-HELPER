const express = require("express");
const textAssistantHelper = require("../helpers/textAssistant.helper");
const router = express.Router();

router.post("/", async (req, res) => {
  const action = req.query.action;
  const content = req.body.content;
  if (action === "summary") {
    var summary = await textAssistantHelper.getSummary(content);
    console.log(summary);
    res.send({ summary });
  } else if (action === "answerMcq") {
    var answerMcq = await textAssistantHelper.getAnswerMcq(content);
    res.send({ answerMcq });
  } else if (action === "getAnswer") {
    var getAnswer = await textAssistantHelper.getAnswer(content);
    res.send({ getAnswer });
  } else if (action === "generateQuestions") {
    var generateQuestions = await textAssistantHelper.generateQuestions(
      content
    );
    res.send({ generateQuestions });
  } else if (action === "extractKeywords") {
    var extractKeywords = await textAssistantHelper.extractKeywords(content);
    res.send({ extractKeywords });
  } else if (action === "paraphrase") {
    var paraphrase = await textAssistantHelper.paraphrase(content);
    res.send({ paraphrase });
  } else {
    res.send({ error: "Invalid action" });
  }
});

module.exports = router;
