import { conversationToolboxContext } from "../context/conversationToolboxContext";
import { MyAI } from "../utils/myAI";
import { getAiResponse, getSelectedLanguage } from "../utils/replyWithAI";

export default function createConversationToolboxUI() {
  conversationToolboxContext.events.push({
    start: (builder, args) => {
      const myAI = new MyAI();
      builder.button("Send reply in " + getSelectedLanguage(), () => {
        getAiResponse(myAI, args["conversationId"], (response) => {
          messaging.sendChatMessage(args["conversationId"], response, () => {});
        });
      });
    },
  });
}
