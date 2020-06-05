import { console } from "../utils/log";

export default function (context: Sketch.Context) {
  console.log("alive!");
  context.document.showMessage("It's alive~ 🙌");
}
