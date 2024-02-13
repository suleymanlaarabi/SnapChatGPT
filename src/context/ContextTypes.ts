import { IConversationToolboxContext } from "./conversationToolboxContext";
import { IFriendFeedContext } from "./friendFeedContext";
import { ISnapActivityContext } from "./snapActivityContext";
import { ISnapApplicationContext } from "./snapApplicationContext";
import { ISnapEnhancerContext } from "./snapEnhancerContext";

export interface ICommonContextEvents<StartContext, args> {
  start: (startContext: StartContext, args: args | null) => void;
}

export type DefaultContext =
  | ISnapActivityContext
  | ISnapApplicationContext
  | ISnapEnhancerContext
  | IFriendFeedContext
  | IConversationToolboxContext;
