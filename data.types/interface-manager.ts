export const enum EnumUI {
  SETTINGS = "settings",
  FRIEND_FEED_CONTEXT_MENU = "friendFeedContextMenu",
  CONVERSATION_TOOLBOX = "conversationToolbox",
}

export const enum EnumPos {
  START = "start",
  END = "end",
  TOP = "top",
  BOTTOM = "bottom",
}
export const enum EnumPosArrangement {
  START = "start",
  END = "end",
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center",
  SPACE_BETWEEN = "spaceBetween",
  SPACE_AROUND = "spaceAround",
  SPACE_EVENLY = "spaceEvenly",
}
export const enum EnumPosAlignment {
  START = "start",
  END = "end",
  TOP = "top",
  BOTTOM = "bottom",
  CENTER_VERTICALLY = "centerVertically",
  CENTER_HORIZONTALLY = "centerHorizontally",
}

export interface AlertDialog {
  show(): void;
  dismiss(): void;
}

export type BuilderCallback = (
  builder: InterfaceBuilder,
  args: Record<string, any>
) => void;

export type AlertDialogCallback = (
  builder: InterfaceBuilder,
  alertDialog: AlertDialog
) => void;

export interface NodeUI {
  setAttribute(key: string, value: any | undefined): void;
  fillMaxWidth(): NodeUI;
  fillMaxHeight(): NodeUI;
  label(text: string): NodeUI;
  padding(padding: number): NodeUI;
  fontSize(size: number): NodeUI;
  color(color: number): NodeUI;
}

export interface RowColumnNodeUI extends NodeUI {
  arrangement(arrangement: EnumPosArrangement): RowColumnNodeUI;
  alignment(alignment: EnumPosAlignment): RowColumnNodeUI;
  spacedBy(spacing: number): RowColumnNodeUI;
}

export interface InterfaceBuilder {
  onDispose(callback: () => void): void;
  onLaunched(callback: () => void): void;
  onLaunched(key: any, callback: () => void): void;
  row(callback: BuilderCallback): RowColumnNodeUI;
  column(callback: BuilderCallback): RowColumnNodeUI;
  text(label: string): NodeUI;
  switch(
    state: boolean | undefined,
    onChange: (state: boolean) => void
  ): NodeUI;
  button(label: string, onClick: () => void): NodeUI;
  slider(
    min: number,
    max: number,
    step: number,
    value: number,
    onChange: (value: number) => void
  ): NodeUI;
  list(
    label: string,
    items: string[],
    onClick: (index: number) => void
  ): NodeUI;
}

export interface InterfaceManager {
  create(name: EnumUI, callback: BuilderCallback): void;
  createAlertDialog(activity: any, callback: AlertDialogCallback): AlertDialog;
  createAlertDialog(
    activity: any,
    builder: (alertDialogBuilder: any) => void,
    callback: AlertDialogCallback
  ): AlertDialog;
}
