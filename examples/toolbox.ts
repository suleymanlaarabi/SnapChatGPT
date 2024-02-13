import { StartFunctionProps } from "../src/index";

export default function start({
  conversationToolboxContext,
}: StartFunctionProps) {
  conversationToolboxContext.events.push({
    start: (builder, args) => {
      builder.text("Conversation id: " + args["conversationId"]);
      builder.button("Dismiss Dialog", () => {
        args["alertDialog"].dismiss();
      });
    },
  });
}
