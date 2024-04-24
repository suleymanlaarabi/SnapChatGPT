import { AndroidContentContext } from "../../../types/android/content/Context";

function getMyUserId(context: AndroidContentContext) {
  const database = context.openOrCreateDatabase("arroyo.db", 0, null);
  const cursor = database.rawQuery(
    "SELECT value FROM required_values WHERE key = 'USERID'",
    null
  );

  try {
    if (cursor.moveToFirst()) {
      return cursor.getString(0);
    }
  } finally {
    cursor.close();
    database.close();
  }

  return null;
}

export default getMyUserId;
