import { AndroidContentContext } from "../content/Context";

declare interface AndroidActivityBundle {
  [key: string]: any;
}

declare interface AndroidActivityMenu {}

declare interface AndroidActivityMenuItem {}

declare interface AndroidActivityKeyEvent {}

declare interface AndroidActivityMotionEvent {}

declare interface AndroidActivity extends AndroidContentContext {
  context: AndroidContentContext;
  intent: AndroidContentIntent;
  savedInstanceState: AndroidActivityBundle | null;
  packageName: string;

  onCreate(savedInstanceState: AndroidActivityBundle | null): void;
  onStart(): void;
  onResume(): void;
  onPause(): void;
  onStop(): void;
  onDestroy(): void;
  onRestart(): void;
  getPackageName(): string;

  runOnUiThread(call: () => any): void;

  onCreateOptionsMenu(menu: AndroidActivityMenu): boolean;
  onOptionsItemSelected(item: AndroidActivityMenuItem): boolean;

  onTouchEvent(event: AndroidActivityMotionEvent): boolean;
  onKeyDown(keyCode: number, event: AndroidActivityKeyEvent): boolean;
  onKeyUp(keyCode: number, event: AndroidActivityKeyEvent): boolean;

  findViewById(id: number): AndroidActivityView;
  startActivityForResult(
    intent: AndroidContentIntent,
    requestCode: number
  ): void;
  setResult(resultCode: number, data: AndroidContentIntent): void;
  finish(): void;
}
