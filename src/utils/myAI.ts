import { myAISenderID } from "../data/senderId";

function getMyAIConversationID(callback: (conversationID: string) => void) {
  messaging.getOneOnOneConversationIds([myAISenderID], (error, result) => {
    const myAIConversationID = result[0].conversationId;
    callback(myAIConversationID);
  });
}

function getLastMessageFromMyAI(callback: (message: string) => void) {
  getMyAIConversationID((myAIConversationID) => {
    messaging.fetchConversationWithMessages(
      myAIConversationID,
      (error, result) => {
        const lastMessage = result[result.length - 1].serialize();
        callback(lastMessage);
      }
    );
  });
}

export class MyAI {
  myAIConversationID: string;
  onMessageWaitList: ((message: string) => void)[] = [];
  constructor() {
    getMyAIConversationID((myAIConversationID) => {
      this.myAIConversationID = myAIConversationID;
    });
    events.onConversationUpdated((update) => {
      if (
        update.messages[0].messageDescriptor.conversationId.toString() ===
        this.myAIConversationID
      ) {
        this.onMessageWaitList.forEach((callback) => {
          callback(update.messages[0].serialize());
          this.onMessageWaitList = [];
        });
      }
    });
  }

  getMyAIResponse(prompt: string, callback: (response: string) => void) {
    this.onMessageWaitList.push(callback);
    messaging.sendChatMessage(this.myAIConversationID, prompt, () => {});
  }

  getConversationID() {
    return this.myAIConversationID;
  }
}
