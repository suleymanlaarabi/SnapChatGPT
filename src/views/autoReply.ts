import getMyUserId from "../common/user/useUser";
import { snapActivityContext } from "../context/snapActivityContext";
import { vocalReply } from "../data/preMessage";
import { replyWithAI } from "../utils/replyWithAI";
import { getIfUseAutoReply } from "./feedFriendToolBox";

export default function initAutoReply() {
  snapActivityContext.events.push({
    start: (activity) => {
      const myUserId = getMyUserId(activity);
      const messageAlreadyReply: number[] = [];
      events.onConversationUpdated((update) => {
        const message = update.messages[0];
        if (!message && !message.messageDescriptor) return;
        const conversationId = message.messageDescriptor.conversationId;
        const messageType = message.messageContent.contentType;
        if (messageType == "CHAT" || messageType == "NOTE") {
          if (message.senderId.toString() != myUserId) {
            let isAlreadySend = false;
            messageAlreadyReply.forEach((id) => {
              if (id == message.messageDescriptor.messageId) {
                isAlreadySend = true;
              }
            });

            if (!isAlreadySend) {
              const useAutoReply = JSON.parse(
                "" + getIfUseAutoReply(conversationId.toString())
              );
              if (useAutoReply) {
                if (messageType == "NOTE") {
                  messaging.sendChatMessage(
                    conversationId.toString(),
                    vocalReply[Math.round(Math.random() * vocalReply.length)],
                    () => {}
                  );
                  return;
                }
                replyWithAI(conversationId.toString());
              }
              messageAlreadyReply.push(message.messageDescriptor.messageId);
            }
          }
        }
      });
    },
  });
}
