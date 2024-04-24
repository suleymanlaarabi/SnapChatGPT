export const enum Stage {
  BEFORE = "before",
  AFTER = "after",
}
export interface Class<T> {
  getName(): string;
}
export interface ScriptHookCallback {
  result: any;
  readonly thisObject: any;
  readonly method: any;
  readonly args: any[];

  cancel(): void;
  arg(index: number): any;
  setArg(index: number, value: any): void;
  invokeOriginal(): void;
  invokeOriginal(args: any[]): void;
  toString(): string;
}

export type HookCallback = (scriptHookCallback: ScriptHookCallback) => void;
export type HookUnhook = () => void;

export interface Hooker {
  findMethod(clazz: Class<any>, methodName: string): any | undefined;
  findMethodWithParameters(
    clazz: Class<any>,
    methodName: string,
    types: string[]
  ): any | undefined;
  findMethod(className: string, methodName: string): any | undefined;
  findMethodWithParameters(
    className: string,
    methodName: string,
    types: string[]
  ): any | undefined;
  findConstructor(clazz: Class<any>, types: string[]): any | undefined;
  findConstructorParameters(
    className: string,
    types: string[]
  ): any | undefined;

  hook(method: any, stage: Stage, callback: HookCallback): HookUnhook;
  hookAllMethods(
    clazz: Class<any>,
    methodName: string,
    stage: Stage,
    callback: HookCallback
  ): HookUnhook;
  hookAllConstructors(
    clazz: Class<any>,
    stage: Stage,
    callback: HookCallback
  ): HookUnhook;
  hookAllMethods(
    className: string,
    methodName: string,
    stage: Stage,
    callback: HookCallback
  ): HookUnhook | undefined;
  hookAllConstructors(
    className: string,
    stage: Stage,
    callback: HookCallback
  ): HookUnhook | undefined;
}
