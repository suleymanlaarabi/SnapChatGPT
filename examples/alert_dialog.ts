import getMyUserId from "../src/common/user/useUser";
import { snapActivityContext } from "../src/context/snapActivityContext";
import { AndroidActivity } from "../types/android/app/Activity";

export default function start() {
  snapActivityContext.events.push({
    start: (activity: AndroidActivity) => {
      const myUserId = getMyUserId(activity);

      activity.runOnUiThread(
        javaInterfaces.runnable(() => {
          var myDialog = im.createAlertDialog(activity, (builder, dialog) => {
            builder.text("My User Id is : " + myUserId);
          });

          myDialog.show();
        })
      );
    },
  });
}
