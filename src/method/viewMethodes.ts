import { ScriptHookCallback } from "../../data.types/hooker";

export const addViewMethod = hooker.findMethod(
  "android.view.ViewGroup",
  "addView"
);

export interface addViewMethodArgs extends ScriptHookCallback {
  args: [AndroidActivityView];
}

export const setContentViewMethod = hooker.findMethod(
  "android.app.Activity",
  "setContentView"
);

export interface setContentViewMethodArgs extends ScriptHookCallback {
  args: [number];
}

export const inflateMethod = hooker.findMethod(
  "android.view.LayoutInflater",
  "inflate"
);

export interface inflateMethodArgs extends ScriptHookCallback {
  args: [AndroidActivityView];
}
