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

export interface SimpleNodeUI {
  setAttribute(key: string, value: any | undefined): void;
  fillMaxWidth(): SimpleNodeUI;
  fillMaxHeight(): SimpleNodeUI;
  padding(padding: number): SimpleNodeUI;
  fontSize(size: number): SimpleNodeUI;
  color(color: number): SimpleNodeUI;
  label(text: string): SimpleNodeUI;
}

export interface NodeUI<T> {
  setAttribute(key: string, value: any | undefined): void;
  fillMaxWidth(): T;
  fillMaxHeight(): T;
  label(text: string): T;
  padding(padding: number): T;
  fontSize(size: number): T;
  color(color: number): T;
}

interface TextInputNodeUI extends NodeUI<TextInputNodeUI> {
  value(value: string): TextInputNodeUI;
  placeholder(placeholder: string): TextInputNodeUI;
  callback(callback: (value: string) => void): TextInputNodeUI;
  readonly(state: boolean): TextInputNodeUI;
  singleLine(state: boolean): TextInputNodeUI;
  maxLines(lines: number): TextInputNodeUI;
}

export type BuilderCallback = (
  builder: InterfaceBuilder,
  args: Record<string, any>
) => void;

export type AlertDialogCallback = (
  builder: InterfaceBuilder,
  alertDialog: AlertDialog
) => void;

export interface RowColumnNodeUI extends NodeUI<RowColumnNodeUI> {
  arrangement(arrangement: EnumPosArrangement): RowColumnNodeUI;
  alignment(alignment: EnumPosAlignment): RowColumnNodeUI;
  spacedBy(spacing: number): RowColumnNodeUI;
}

export interface InterfaceBuilder {
  onDispose(callback: () => void): void;
  onLaunched(callback: () => void): void;
  onLaunched(key: any, callback: () => void);
  row(callback: BuilderCallback): RowColumnNodeUI;
  column(callback: BuilderCallback): RowColumnNodeUI;
  text(label: string): NodeUI<SimpleNodeUI>;
  switch(
    state: boolean | undefined,
    onChange: (state: boolean) => void
  ): NodeUI<SimpleNodeUI>;
  button(label: string, onClick: () => void): NodeUI<SimpleNodeUI>;
  slider(
    min: number,
    max: number,
    step: number,
    value: number,
    onChange: (value: number) => void
  ): NodeUI<SimpleNodeUI>;
  list(
    label: string,
    items: string[],
    onClick: (index: number) => void
  ): NodeUI<SimpleNodeUI>;
  textInput(
    placeholder: string,
    value: string,
    onChange: (value: string) => void
  ): TextInputNodeUI;
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
