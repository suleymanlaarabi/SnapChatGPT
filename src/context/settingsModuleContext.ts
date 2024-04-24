import { InterfaceBuilder } from "../../data.types/interface-manager";
import { ICommonContextEvents } from "./ContextTypes";

export interface ISettingsContext {
  events: Array<ICommonContextEvents<InterfaceBuilder, Record<string, any>>>;
}

export const settingsContext: ISettingsContext = {
  events: [],
};
