import { ICommonContextEvents } from "./ContextTypes";

export interface IUnloadContext {
  events: Array<ICommonContextEvents<any, any>>;
}

export const unloadContext: IUnloadContext = {
  events: [],
};
