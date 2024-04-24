export const enum EnumHttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type NetworksHeader = {
  name: string;
  value: string;
};

export interface RequestBuilder {
  url(url: string): RequestBuilder;
  addHeader(name: string, value: string): RequestBuilder;
  removeHeader(name: string): RequestBuilder;
  method(method: EnumHttpMethod, body: string | undefined): RequestBuilder; // byte[] | java.io.InputStream
}

export interface NetworksResponse {
  readonly tatusCode: number;
  readonly statusMessage: string;
  readonly headersRecord: Record<string, string>;
  readonly bodyAsString: string;
  readonly bodyAsStream: any; // java.io.InputStream
  readonly bodyAsByteArray: any; // byte[]
  readonly contentLength: number;
  getHeader(name: string): string | undefined;
  close(): void;
}

export interface Websocket {
  cancel(): void;
  close(code: number, reason: string): void;
  queueSize(): number;
  send(bytes: any): void; // byte[] | string
}

export interface WebsocketListener {
  onOpen?: (websocket: Websocket, response: NetworksResponse) => void;
  onClosed?: (websocket: Websocket, code: number, reason: string) => void;
  onClosing?: (websocket: Websocket, code: number, reason: string) => void;
  onFailure?: (
    websocket: Websocket,
    throwable: any,
    response: NetworksResponse | undefined
  ) => void;
  onMessageBytes?: (websocket: Websocket, bytes: any) => void; // byte[]
  onMessageText?: (websocket: Websocket, text: string) => void;
}

export interface Networking {
  getUrl(
    url: string,
    callback: (error: string | undefined, response: string) => void
  ): void;
  getUrlAsStream(
    url: string,
    callback: (error: string | undefined, response: any) => void
  ): void; // java.io.InputStream
  newRequest(): RequestBuilder;
  enqueue(
    requestBuilder: RequestBuilder,
    callback: (
      error: string | undefined,
      response: NetworksResponse | undefined
    ) => void
  ): void;
  execute(requestBuilder: RequestBuilder): NetworksResponse;
  newWebSocket(
    requestBuilder: RequestBuilder,
    listener: WebsocketListener
  ): void;
}
