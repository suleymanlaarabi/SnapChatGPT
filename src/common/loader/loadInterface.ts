import createConversationToolboxUI from "../../views/conversationToolBox";
import { createFriendFeedToolBoxUI } from "../../views/feedFriendToolBox";
import createManagerToolBoxUI from "../../views/managerToolBox";

export default function createInterface() {
  createConversationToolboxUI();
  createManagerToolBoxUI();
  createFriendFeedToolBoxUI();
}
