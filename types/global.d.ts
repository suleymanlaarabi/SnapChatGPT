import { Config } from "../data.types/config";
import { Class, Hooker } from "../data.types/hooker";
import { InterfaceManager } from "../data.types/interface-manager";

import { Events } from "../data.types/events";
import { IPC } from "../data.types/ipc";
import { JavaInterface } from "../data.types/java-interface";
import { Messaging } from "../data.types/messaging";
import { Networking } from "../data.types/networking";
declare global {
  const networking: Networking;
  const config: Config;
  const im: InterfaceManager;
  const javaInterfaces: JavaInterface;
  const ipc: IPC;
  const messaging: Messaging;
  const hooker: Hooker;
  const events: Events;

  interface Array<T> {
    size: () => number;
  }

  interface JavaType {
    newInstance(...args: any[]): any;
  }

  interface SEWrapper {
    instanceNonNull(): any;
    isPresent(): boolean;
    toString(): string;

    getEnumValue(fieldName: string, defaultValue: any): any;
    setEnumValue(fieldName: string, value: any /* java.lang.Enum */): void;
  }

  const currentSide: "core" | "manager";

  namespace module {
    interface ModuleInfo {
      readonly name: string;
      readonly displayName: string;
      readonly version: string;
      readonly description: string | undefined;
      readonly author: string | undefined;
      readonly minSnapchatVersion: number | undefined;
      readonly minSEVersion: number | undefined;
      readonly grantedPermissions: string[];
    }

    let exports: any | undefined;

    const info: ModuleInfo;

    // SnapEnhance side
    let onSnapEnhanceLoad: ((context: any) => void) | undefined;

    // Snapchat side
    let onSnapApplicationLoad: ((context: any) => void) | undefined;
    let onSnapMainActivityCreate: ((activity: any) => void) | undefined;

    let onUnload: (() => void) | undefined;
  }

  function sleep(ms: number): Promise<void>;

  function logInfo(message: any);
  function logError(message: any, throwable?: any);

  function shortToast(...messages: string[]);
  function longToast(...messages: string[]);

  function type(
    className: string,
    useModClassLoader?: boolean
  ): JavaType | undefined;
  function findClass(
    className: string,
    useModClassLoader?: boolean
  ): Class<any> | undefined;
  function setField(
    instance: any,
    fieldName: string,
    value: any | undefined
  ): void;
  function getField(instance: any, fieldName: string): any | undefined;
}
