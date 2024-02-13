import { conversationToolboxContext } from "../context/conversationToolboxContext";
import { getAiResponse, getSelectedLanguage } from "../utils/replyWithAI";

export default function createConversationToolboxUI() {
  conversationToolboxContext.events.push({
    start: (builder, args) => {
      builder.button("Send reply in " + getSelectedLanguage(), () => {
        getAiResponse(args["conversationId"], (response) => {
          messaging.sendChatMessage(
            args["conversationId"],
            JSON.parse(response.response.bodyAsString),
            () => {}
          );
        });
      });
    },
  });
}
