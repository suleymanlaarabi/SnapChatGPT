import { EnumPosArrangement } from "../../data.types/interface-manager";
import { friendFeedContext } from "../context/friendFeedContext";

export function getIfUseAutoReply(conversationId: string): boolean {
  const configID = "useAutoReply-" + conversationId;
  return config.getBoolean(configID, false);
}

export function createFriendFeedToolBoxUI() {
  friendFeedContext.events.push({
    start: (builder, args) => {
      const conversationId = args["conversationId"];
      const configID = "useAutoReply-" + conversationId;
      builder
        .row((builder) => {
          builder.text("Use auto reply");
          builder.switch(config.getBoolean(configID, false), (value) => {
            config.setBoolean(configID, value, true);
          });
        })
        .arrangement(EnumPosArrangement.SPACE_BETWEEN)
        .fillMaxWidth()
        .padding(4);
    },
  });
}
