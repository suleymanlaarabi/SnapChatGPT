import { languages } from "../data/language";
import { defaultPrompt } from "../views/managerToolBox";
import { getLatestMessages } from "./message";
import { MyAI } from "./myAI";

export function getAiResponse(
  myAI: MyAI,
  conversationId: string,
  onResponseCallBack: (response: string) => void
) {
  getLatestMessages(conversationId, (messageList) => {
    const lastMessageFromB = messageList
      .slice()
      .reverse()
      // without find method
      .filter((msg) => msg.sender === "b")[0];

    const context = messageList.slice(
      Math.max(messageList.length - 8, 0),
      messageList.length - 1
    );
    const listMessages = context
      .map((msg) => `${msg.sender}: ${msg.message}`)
      .join("\n");
    const myLastMessage = lastMessageFromB.message;

    const prompt = config
      .get("customPrompt", defaultPrompt)
      .replace("<myLastMessage>", myLastMessage)
      .replace("<listMessages>", listMessages)
      .replace("<language>", getSelectedLanguage());
    myAI.getMyAIResponse(prompt, onResponseCallBack);
  });
}

export function replyWithAI(myAI: MyAI, conversationId: string) {
  getAiResponse(myAI, conversationId, (response) => {
    messaging.sendChatMessage(conversationId, response, () => {});
  });
}

export function getSelectedLanguage() {
  return languages[config.getInteger("languageAI", 1)];
}
