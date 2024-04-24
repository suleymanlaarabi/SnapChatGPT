import { settingsContext } from "../context/settingsModuleContext";
import { languages } from "../data/language";
import { getSelectedLanguage } from "../utils/replyWithAI";

export const defaultPrompt =
  "Conversation with a friend. \n <listMessages> Write a respond to: <myLastMessage>, IN <language> !. Do not refer to your AI capabilities !. If the conversation slows down, continue with a relevant question or comment. your answer must be short.";

export default function createManagerToolBoxUI() {
  settingsContext.events.push({
    start: (builder) => {
      const oldSelectedLanguage = getSelectedLanguage();
      builder.row((builder) => {
        const text = builder.text("Language :" + oldSelectedLanguage);
        builder.slider(
          0,
          languages.length - 1,
          languages.length - 2,
          config.getInteger("languageAI", 0),
          (value) => {
            text.label("Language :" + languages[value]);
            config.setInteger("languageAI", value, true);
          }
        );
      });

      builder.row((builder) => {
        builder.button("Clear Config", () => {
          config.set("customPrompt", defaultPrompt, true);
          config.setInteger("languageAI", 0, true);
        });
      });

      builder.row((builder) => {
        builder
          .textInput(
            "Custom Prompt",
            config.get("customPrompt", defaultPrompt),
            (value) => {
              config.set("customPrompt", value, true);
            }
          )
          .maxLines(8)
          .singleLine(false);
      });
    },
  });
}
