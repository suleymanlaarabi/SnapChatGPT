import { DefaultContext } from "../src/context/ContextTypes";
import { StartFunctionProps } from "../src/index";

export default function start(props: StartFunctionProps) {
  Object.keys(props).forEach((key) => {
    const context: DefaultContext = props[key];
    context.events.push({
      start: () => {
        shortToast("SnapChat Opened");
      },
    });
  });
}
