import { StartFunctionProps } from "../src/index";

export default function start({
  snapEnhancerContext,
  snapActivityContext,
}: StartFunctionProps) {
  snapActivityContext.events.push({
    start: (activity) => {
      ipc.emit("myEvent", "hello", 255, activity.packageName);
    },
  });
  snapEnhancerContext.events.push({
    start: (context) => {
      ipc.on("myEvent", (args) => {
        longToast("received event: " + args);
      });
    },
  });
}
