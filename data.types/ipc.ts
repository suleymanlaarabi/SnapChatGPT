export type Listener = (args: any[]) => void;

export interface IPC {
  on(channel: string, listener: Listener): void;
  onBroadcast(channel: string, listener: Listener): void;

  emit(eventName: string): void;
  emit(eventName: string, ...args: any[]): void;
  broadcast(channel: string, eventName: string): void;
  broadcast(channel: string, eventName: string, ...args: any[]): void;
}
