import { EnumHttpMethode } from "../../data.types/networking";
import useFetch, { UseFetchResponse } from "../common/network/useFetch";
import { languages } from "../data/language";
import { getLatestMessages } from "./message";

export function getAiResponse(
  conversationId: string,
  onResponseCallBack: (response: UseFetchResponse) => void
) {
  getLatestMessages(conversationId, (messageList) => {
    const response = useFetch({
      methode: EnumHttpMethode.POST,
      body: JSON.stringify({
        messages: messageList,
        language: getSelectedLanguage(),
      }),
      url: "https://snapai.suleyman.cloud/gpt4",
      headers: [
        {
          name: "Content-Type",
          value: "application/json",
        },
        {
          name: "Accept",
          value: "application/json",
        },
      ],
    });
    onResponseCallBack(response);
  });
}

export function replyWithAI(conversationId: string) {
  getAiResponse(conversationId, (response) => {
    messaging.sendChatMessage(
      conversationId,
      JSON.parse(response.response.bodyAsString),
      () => {}
    );
  });
}

export function getSelectedLanguage() {
  return languages[config.getInteger("languageAI", 1)];
}
