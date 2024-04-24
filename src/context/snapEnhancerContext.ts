import { AndroidContentContext } from "../../types/android/content/Context";
import { ICommonContextEvents } from "./ContextTypes";

export interface ISnapEnhancerContext {
  context: AndroidContentContext;
  events: Array<ICommonContextEvents<AndroidContentContext, any>>;
}

export const snapEnhancerContext: ISnapEnhancerContext = {
  context: null,
  events: [],
};
