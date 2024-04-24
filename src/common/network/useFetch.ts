import {
  EnumHttpMethod,
  NetworksHeader,
  NetworksResponse,
} from "../../../data.types/networking";

interface UseFetchProps {
  url: string;
  body?: string;
  method?: EnumHttpMethod;
  headers?: NetworksHeader[];
}

export interface UseFetchResponse {
  getJSON(): () => any;
  response: NetworksResponse;
}

export default function useFetch(props: UseFetchProps) {
  const request = networking.newRequest().url(props.url);

  if (props.method != EnumHttpMethod.GET && props.method) {
    request.method(props.method, props.body);
  }

  props.headers?.forEach((header) => {
    request.addHeader(header.name, header.value);
  });
  const response = networking.execute(request);
  return {
    getJSON: () => JSON.parse("" + response.bodyAsString),
    response: response,
  };
}
