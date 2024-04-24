import createInterface from "./common/loader/loadInterface";
import { StartFunctionProps } from "./index";
import initAutoReply from "./views/autoReply";

export default function start(_: StartFunctionProps) {
  createInterface();
  initAutoReply();
}
