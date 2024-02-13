import { EnumUI } from "../data.types/interface-manager";
import { StartFunctionProps } from "../src/index";

export default function start({ snapApplicationContext }: StartFunctionProps) {
  snapApplicationContext.events.push({
    start: (context) => {
      im.create(EnumUI.CONVERSATION_TOOLBOX, (builder, args) => {
        shortToast("conversationToolbox : " + args["conversationId"]);
        if (!messaging.isPresent()) {
          builder.text("Messaging isn't loaded!");
          return;
        }

        var text1 = builder.text("Fetching conversation...");

        messaging.fetchConversationWithMessages(
          args["conversationId"],
          (error, messageList) => {
            if (error != null) {
              text1.setAttribute(
                "label",
                "Failed to fetch conversation: " + error
              );
              return;
            }

            messageList.forEach((message) => {
              logInfo("message : " + message.serialize());
            });

            text1.setAttribute(
              "label",
              "This conversation has " + messageList.size() + " recent messages"
            );
          }
        );

        builder.button("Send Hello World", () => {
          messaging.sendChatMessage(
            args["conversationId"],
            "Hello World!",
            (error) => {
              if (error != null) {
                longToast("Failed to send message: " + error);
                return;
              }

              shortToast("Message sent!");
            }
          );
        });
      });
    },
  });
}
