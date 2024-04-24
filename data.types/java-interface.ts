import { Class } from "./hooker";
export interface JavaInterface {
  runnable(callback: () => void): any;
  newProxy(
    javaClass: Class<any>,
    callback: (proxy: any, method: any, args: any[]) => any
  ): any;
}
