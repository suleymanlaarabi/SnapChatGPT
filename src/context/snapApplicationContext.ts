import { AndroidContentContext } from "../../types/android/content/Context";
import { ICommonContextEvents } from "./ContextTypes";

export interface ISnapApplicationContext {
  context: AndroidContentContext;
  events: Array<ICommonContextEvents<AndroidContentContext, any>>;
}
export const snapApplicationContext: ISnapApplicationContext = {
  context: null,
  events: [],
};
