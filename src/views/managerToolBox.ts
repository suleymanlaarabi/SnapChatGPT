import { settingsContext } from "../context/settingsModuleContext";
import { languages } from "../data/language";
import { getSelectedLanguage } from "../utils/replyWithAI";

export default function createManagerToolBoxUI() {
  settingsContext.events.push({
    start: (builder) => {
      const oldSelectedLanguage = getSelectedLanguage();
      builder.row((builder) => {
        const text = builder.text("Language :" + oldSelectedLanguage);
        builder.slider(0, 4, 3, config.getInteger("languageAI", 0), (value) => {
          text.label("Language :" + languages[value]);
          config.setInteger("languageAI", value, true);
        });
      });
    },
  });
}
