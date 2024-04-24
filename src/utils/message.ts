import { Message } from "../../data.types/messaging";
import getMyUserId from "../common/user/useUser";
import { snapActivityContext } from "../context/snapActivityContext";

interface AIMessage {
  sender: string;
  message: string;
}

function toOnlyValidMessages(messageList: Message[]) {
  const userId = getMyUserId(snapActivityContext.activity); // Obtient l'ID de l'utilisateur actuel
  const validMessages = [];

  messageList.forEach((message) => {
    const serializedMessage = message.serialize();
    if (serializedMessage != null) {
      validMessages.push({
        sender: message.senderId.toString() == userId ? "a" : "b",
        senderDisplay:
          message.senderId.toString() == userId
            ? "(moi)"
            : "autre personne (repond a lui)",
        message: serializedMessage,
      });
    }
  });

  return validMessages;
}
export function getLatestMessages(
  conversationId: string,
  callback: (messages: AIMessage[]) => void
) {
  messaging.fetchConversationWithMessages(
    conversationId,
    (error, messageList) => callback(toOnlyValidMessages(messageList))
  );
}
