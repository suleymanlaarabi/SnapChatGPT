export interface Config {
  get(key: string): string | undefined;
  get(key: string, defaultValue: any): string;

  getInteger(key: string): number | undefined;
  getInteger(key: string, defaultValue: number): number;

  getDouble(key: string): number | undefined;
  getDouble(key: string, defaultValue: number): number;

  getBoolean(key: string): boolean | undefined;
  getBoolean(key: string, defaultValue: boolean): boolean;

  getLong(key: string): number | undefined;
  getLong(key: string, defaultValue: number): number | undefined;

  getFloat(key: string): number | undefined;
  getFloat(key: string, defaultValue: number): number | undefined;

  getByte(key: string): number | undefined;
  getByte(key: string, defaultValue: number): number | undefined;

  getShort(key: string): number | undefined;
  getShort(key: string, defaultValue: number): number | undefined;

  set(key: string, value: any): void;
  set(key: string, value: any, save: boolean): void;

  setInteger(key: string, value: number): void;
  setInteger(key: string, value: number, save: boolean): void;

  setDouble(key: string, value: number): void;
  setDouble(key: string, value: number, save: boolean): void;

  setBoolean(key: string, value: boolean): void;
  setBoolean(key: string, value: boolean, save: boolean): void;

  setLong(key: string, value: number): void;
  setLong(key: string, value: number, save: boolean): void;

  setFloat(key: string, value: number): void;
  setFloat(key: string, value: number, save: boolean): void;

  setByte(key: string, value: number): void;
  setByte(key: string, value: number, save: boolean): void;

  setShort(key: string, value: number): void;
  setShort(key: string, value: number, save: boolean): void;

  save(): void;
  load(): void;
  deleteConfig(): void;
}
