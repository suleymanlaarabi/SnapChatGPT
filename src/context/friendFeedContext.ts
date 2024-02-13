import { InterfaceBuilder } from "../../data.types/interface-manager";
import { ICommonContextEvents } from "./ContextTypes";

export interface IFriendFeedContext {
  events: Array<ICommonContextEvents<InterfaceBuilder, Record<string, any>>>;
}

export const friendFeedContext: IFriendFeedContext = {
  events: [],
};
